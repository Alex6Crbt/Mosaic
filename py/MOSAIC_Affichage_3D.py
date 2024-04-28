#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 18 19:38:18 2023

@author: alexis
"""
import numpy as np
from sklearn.linear_model import LinearRegression
import os
import pyvista as pv
import cv2

"""
Options
"""

afficher_volume = False # Si False le nuage de points sera affiché (enlever le tilt est uniquement possible sur le nuage de points)
enlever_tilt = True  # Option possible uniquement si le nuage de points est affiché
contours_seulement = False  # Option possible uniquement si afficher_volume est True


# Chemin vers le dossier contenant les images
folder_path = "/Bibliographie complémentaire-20231218/stack_ima_fluo_ill_struct"


# Récupération de la liste des noms de fichiers d'images triés
image_files = sorted([file for file in os.listdir(folder_path)])


# Les images sont chargées, converties en niveaux de gris si nécessaire, puis filtrées avec un filtre médian.
images = []
for k in image_files:
    image = cv2.imread(os.path.join(folder_path, k), cv2.IMREAD_ANYDEPTH)
    # Vérifier si l'image a été chargée correctement
    if image is not None:
        # Convertir l'image en niveaux de gris si nécessaire
        if len(image.shape) > 2:
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray_image = image
        # Appliquer un filtre médian avec un noyau de taille 3x3
        blurred_image = cv2.medianBlur(gray_image, 3)
        im = np.array(blurred_image)
        im = im * 255 / np.max(im)
        images.append(im)


#%% Dans cette partie, un nuage de points est affiché après avoir ajusté le tilt avec une régression linéaire. Un plan ajusté est également tracé.

if (not afficher_volume) & enlever_tilt:

    n, p = np.shape(images[0])

    ln = [-k for k in range(n)]
    lp = [k for k in range(p)]

    X, Y = np.meshgrid(lp, ln)
    li = len(images)
    x = np.hstack([np.hstack(X) for k in range(li)])
    y = np.hstack([np.hstack(Y) for k in range(li)])

    c1 = np.hstack([np.hstack(images[k]) for k in range(li)])

    z = np.hstack([10 * k * np.ones((n * p)) for k in range(li)])

    # seuillage des points
    masque = c1 > 100

    c = c1[masque]

    x = x[masque]
    y = y[masque]
    z = z[masque]

    # Calcul du plan moyen

    points = np.array([x, y, z]).transpose()

    X = points[:, :2]
    y = points[:, 2]

    reg = LinearRegression()

    reg.fit(X, y)

    coef_x = reg.coef_[0]
    coef_y = reg.coef_[1]
    intercept = reg.intercept_

    # Mise à jour du tableau points avec les valeurs ajustées de Z
    points[:, 2] = points[:, 2] - coef_x * points[:, 0] - coef_y * points[:, 1]

    # Aplatissement des valeurs de Z pour la cartographie des couleurs
    c = np.hstack(points[:, 2])

    pv_points = pv.PolyData(points)
    plotter = pv.Plotter()
    plotter.add_points(pv_points, render_points_as_spheres=True, interpolate_before_map=True, diffuse=True, specular=True,
                       smooth_shading=True, point_size=5.0, cmap='terrain', scalars=c)

    x = points[:, 0]
    y = points[:, 1]
    z = points[:, 2]

    # mesh grid pour le plan
    xx, yy = np.meshgrid(np.linspace(x.min(), x.max(), 10),
                         np.linspace(y.min(), y.max(), 10))
    zz = coef_x * xx + coef_y * yy + intercept

    plotter.add_mesh(pv.PolyData(np.c_[xx.flatten(), yy.flatten(
    ), zz.flatten()]), color="red", opacity=0.5, point_size=8)

    plotter.show()


# %% Affichages des points en nuage sans avoir retiré le plan ajusté.

if (not afficher_volume) & (not enlever_tilt):

    n, p = np.shape(images[0])

    ln = [-k for k in range(n)]
    lp = [k for k in range(p)]

    X, Y = np.meshgrid(lp, ln)
    li = len(images)
    x = np.hstack([np.hstack(X) for k in range(li)])
    y = np.hstack([np.hstack(Y) for k in range(li)])

    c1 = np.hstack([np.hstack(images[k]) for k in range(li)])

    z = np.hstack([10 * k * np.ones((n * p)) for k in range(li)])

    # seuillage des points

    masque = c1 > 100

    c = c1[masque]

    x = x[masque]
    y = y[masque]
    z = z[masque]

    points = np.array([x, y, z]).transpose()

    c = np.hstack(z)

    pv_points = pv.PolyData(points)
    plotter = pv.Plotter()
    plotter.add_points(pv_points, interpolate_before_map=True, diffuse=True, specular=True, smooth_shading=True,
                       point_size=5.0, cmap='terrain', scalars=c)
    plotter.show()

# %% Affichage du volume
if afficher_volume & (not contours_seulement):

    n, p = np.shape(images[0])

    ln = [k for k in range(n)]
    lp = [k for k in range(p)]

    li = len(images)

    c1 = np.hstack([np.hstack(images[k]) for k in range(li)])

    # attention a mettre la bonne résolution des images ici.
    grid = pv.ImageData(dimensions=(2040, 1086, 16),
                        # Changer le dernier élément de spacing modifie l'épaisseur entre les couches
                        spacing=(1, 1, 10),
                        )

    c1 = np.log1p(c1)

    # seuil pour un meilleur affichage

    seuil = 4.1

    c1[c1 < seuil] = 0

    c1[c1 >= seuil] = 10

    grid['scalars'] = c1

    pl = pv.Plotter()
    vol = pl.add_volume(grid, cmap='magma_r', opacity='sigmoid_6')

    vol.prop.interpolation_type = 'linear'

    pl.show_axes()
    pl.show()

# %% Affichage du contour du volume

if afficher_volume & contours_seulement:

    n, p = np.shape(images[0])

    ln = [k for k in range(n)]
    lp = [k for k in range(p)]

    li = len(images)

    c1 = np.hstack([np.hstack(images[k]) for k in range(li)])

    grid = pv.ImageData(dimensions=(2040, 1086, 16),
                        spacing=(1, 1, 10),
                        )

    c1 = np.log1p(c1)

    # seuil pour un meilleur affichage et discrimination des contours

    seuil = 4.1

    c1[c1 < seuil] = 0

    c1[c1 >= seuil] = 10

    grid['scalars'] = c1

    pl = pv.Plotter()
    vol = pl.add_volume(grid, cmap='magma_r', opacity='sigmoid_6')

    vol.prop.interpolation_type = 'linear'

    eval_at = grid['scalars'].max() * 0.15
    contours = grid.contour(
        [eval_at],
        scalars=grid['scalars'],
        method='marching_cubes',
        progress_bar=True,
    )
    contours = contours.interpolate(grid)
    contours.plot(
        smooth_shading=True,
        color='lightblue',
        line_width=5,
        show_scalar_bar=False,
    )

    pl.show_axes()
    pl.show()
