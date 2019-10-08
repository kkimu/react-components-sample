import React from 'react'

import { Carousel } from '.'

export default {
  title: 'Carousel'
}

// Data for carousel
const carouselSlidesData = ['1','2','3','4','5','6','7'];

export const carousel = () => (
  <Carousel slides={carouselSlidesData}/>
)
