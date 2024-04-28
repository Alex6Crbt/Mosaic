#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 20 09:18:36 2023

@author: alexis
"""

# Python program to demonstrate erosion and
# dilation of images.
import cv2
import numpy as np
import matplotlib.pyplot as plt
 
# Reading the input image
img1 = cv2.imread('/Users/alexis/Downloads/Bibliographie complémentaire-20231218/stack_ima_fluo_ill_struct/01.tiff', cv2.IMREAD_ANYDEPTH)
 
# Taking a matrix of size 5 as the kernel

k_size = 3

img = cv2.medianBlur(img1, k_size)

kernel = np.ones((k_size,k_size), np.uint8)
 
# The first parameter is the original image,
# kernel is the matrix with which image is
# convolved and third parameter is the number
# of iterations, which will determine how much
# you want to erode/dilate a given image.
img_erosion = cv2.erode(img, kernel, iterations=1)


k_size = 3

kernel = np.ones((k_size,k_size), np.uint8)

img_dilation = cv2.dilate(img, kernel, iterations=2)
 
im_ed = cv2.dilate(img_erosion, kernel, iterations=1)



# Affichage des images dans une grille 4x4
fig, axes = plt.subplots(1, 4,figsize = (16,4))

images = [img, img_erosion, img_dilation, im_ed]


R1 = 20*np.log10(np.mean(img1)/np.std(img1))
R2 = 20*np.log10(np.mean(img_erosion)/np.std(img_erosion))
R3 = 20*np.log10(np.mean(img_dilation)/np.std(img_dilation))
R4 = 20*np.log10(np.mean(im_ed)/np.std(im_ed))

print(f'R1 = {R1:0.2f}, R2 = {R2:0.2f}, R3 = {R3:0.2f}, R4 = {R4:0.2f}')

# Coordonnées de la zone à zoomer
zoom_x = 1260  # Coordonnée x du coin supérieur gauche de la zone à zoomer
zoom_y = 485  # Coordonnée y du coin supérieur gauche de la zone à zoomer
zoom_width = 1340-zoom_x  # Largeur de la zone à zoomer
zoom_height = 530-zoom_y  # Hauteur de la zone à zoomer
labels = [f'Input : filtre médian,\n$RSB = {R1:0.2f}$', f'Erosion, \n$RSB = {R2:0.2f}$', f'Dilation, \n$RSB = {R3:0.2f}$', f'Érosion-Dilatation, \n$RSB = {R4:0.2f}$']
# labels = ['Input', 'Erosion', 'Dilation', 'érosion  dilatation']
for i, ax in enumerate(axes.flat):
    ax.imshow(images[i], cmap='twilight_r')  # Affichage en niveaux de gris
    ax.set_title(labels[i])

    ax.axis('off')  # Masquer les axes
    ax.set_xlim(zoom_x, zoom_x + zoom_width)
    ax.set_ylim(zoom_y + zoom_height, zoom_y)  # Inverser l'axe y pour avoir le bon sens



plt.show()