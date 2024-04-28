import { proxy } from 'valtio'

const state_v = proxy({
  intro: true,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  color: '#EF674E',
  element: null,
  rays: true,
  fluorays: true,
  etape: 0,
  cam_pos: [[10, 10, 20],[-8, 6, 5],[-2, 6, -10],[-4, 6, -10],[-6, 6, -10],[2, 5, 10],[3, 5, 10],[6, 5, 10],[10, 5, 10],[10, 10, -20],[10, 10, -0]],
  cam_look: [[0,0,0],[-6, 1.88, -5.991],[-11.141, 1.656, 2.21],[-8, 1.656, 2.21],[-5.5, 1.656, 2.21],[6.627, 2.072, 0.831],[6.627, 2.072, 0.831],[6.627, 2.072, 0.831],[6.627, 2.072, 0.831],[1.747, 2.331, 1.262],[1.883, 2.699, -5.534]],
  img: ["capt1.png", false, false, false, false, false, false, false, false, false, false],
})

export { state_v }

