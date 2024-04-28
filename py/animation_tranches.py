#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 18 19:04:48 2023

@author: alexis
"""
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider
import os
from PIL import Image
from matplotlib.animation import FuncAnimation
import cv2
import numpy as np

# %%
# Chemin vers le dossier contenant les images
folder_path = "/Users/alexis/Downloads/Bibliographie complémentaire-20231218/stack_ima_fluo_ill_struct"

# Récupération de la liste des noms de fichiers d'images triés
image_files = sorted([file for file in os.listdir(folder_path)])

# Chargement des images dans une liste
images = [Image.open(os.path.join(folder_path, img)) for img in image_files]

# Création de la figure
fig, ax = plt.subplots()
plt.subplots_adjust(bottom=0.25)

# Affichage de la première image
current_image = ax.imshow(images[0])

# Positionnement initial du slider
axcolor = 'lightgoldenrodyellow'
ax_slider = plt.axes([0.2, 0.1, 0.65, 0.03], facecolor=axcolor)

# Valeurs possibles du slider (basées sur le nombre d'images)
slider = Slider(ax_slider, 'Image', 1, len(images), valinit=1, valstep=1)

def update(val):
    idx = int(slider.val) - 1  # Index basé sur la valeur du slider (de 0 à len(images)-1)
    current_image.set_data(images[idx])
    fig.canvas.draw_idle()

slider.on_changed(update)

plt.show()
# %%

# Chemin vers le dossier contenant les images
folder_path = "/Users/alexis/Downloads/Bibliographie complémentaire-20231218/stack_ima_fluo_ill_struct"

# Récupération de la liste des noms de fichiers d'images triés
image_files = sorted([file for file in os.listdir(folder_path)])

image_files =[image_files[-k-1] for k in range(len(image_files)-1)]+ image_files

# Chargement des images dans une liste
images = [np.array(Image.open(os.path.join(folder_path, img))) for img in image_files]

masque = [i<50 for i in images]

for k in range(len(images)):
    images[k][masque[k]]=00
    images[k] = images[k]/np.max(images[k])
    


# Création de la figure
fig, ax = plt.subplots()

ax.axis('off')
# Affichage de la première image
current_image = ax.imshow(images[0])


# Fonction d'animation pour mettre à jour les images
def animate(frame):
    idx = int(frame) % len(images)  # Répétition cyclique des images
    current_image.set_data(images[idx])

# Création de l'animation en utilisant FuncAnimation
ani = FuncAnimation(fig, animate, frames=len(images), interval=1, repeat=True)

ani.save('animation10fps.gif', writer='pillow', fps=10)

plt.show()



