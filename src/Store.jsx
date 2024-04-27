import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  decals: ['react', 'three2', 'pmndrs'],
  color: '#EF674E',
  decal: 'three2',
  element: null,
  cam_pos: [[-8,1,0],[0,0,0]],
  float_sp: [0, 1]
})

export { state }

