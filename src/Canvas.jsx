import { useEffect, useState, useRef, useCallback } from "react"
// import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Outline, EffectComposer, Selection, Select, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing"
import {CameraControls, Grid, Caustics, useAnimations, useGLTF, Float, Lightformer, Text, Html, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei"
import { useControls } from 'leva'
import { easing } from "maath"
import { debounce } from "lodash"
import { KernelSize } from 'postprocessing'
import { useSnapshot } from 'valtio'
import { state } from './Store'
import { useSpring, animated, config } from '@react-spring/three'



// useGLTF.preload('/Mosaic_syst2.gltf')
function Scene3D() {
  return (
    <>
      <Canvas gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client" shadows camera={{ position: [0, 10, 25], fov: 50 }}>
        <Selection>
            <Bkgnd/>
            {/*<Status/>*/}
            <Rig>
            {/*<Float speed={2} rotationIntensity={1} floatIntensity={5}>*/}
              <Model scale={1} position={[0,0,0]} rotation={[0, 0, 0]}/>
            </Rig>
            {/*</Float>*/}
            {/*<Sol />*/}
            {/*</Rig>*/}
        </Selection>
               
      </Canvas>
    </>
  )
}
  





function Rig({ children }) {
  const snap = useSnapshot(state)
  const { size } = useThree()
  const {cameraControlsRef, spot_ref} = useRef()
  const group_ref = useRef()
  // const { x, y, z, xl, yl, zl, position, controls} = useControls({ 
  //   x:0, 
  //   y:10, 
  //   z:25, 
  //   xl:20, 
  //   yl:10, 
  //   zl:10,
  //   myInterval: {
  //     min: 0,
  //     max: 10,
  //     // initial value of 4, 5
  //     value: [4, 5],
  //   },
  //   position: {
  //     value: { x: 0, y: 0, z: 0 },
  //     step: 0.1,
  //   },
  //   controls: false
  // })
  const gridConfig = {
    cellSize: 0.5,
    cellThickness: 0.75,
    cellColor: '#6f6f6f',
    sectionSize: 3,
    sectionThickness: 1,
    sectionColor: '#9d4b4b',
    fadeDistance: 75,
    fadeStrength: 1,
    followCamera: false,
    infiniteGrid: true
  }
  useFrame((state, delta) => {
    if(snap.intro){
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 10-8, state.pointer.y * 3.5+10, 15 + Math.cos(state.pointer.x) * 10],
      0.25,
      delta,
    )
            group_ref.current.rotation.y += delta*0.1

    }
  //   easing.dampLookAt(
  //     state.camera,
  //     snap.intro ? [-8,-1,0] : [0,0,-15],
  //     0.1,
  //     delta,
  //   )
  // }
    else {
      }
    // console.log(state.camera.position)
    // state.camera.lookAt(0,0,0)
    // snap.intro ? null : state.camera.lookAt(0, 0, 0)//[0, 10, 25]     easing.damp3(state.camera.lookAt, snap.intro ? [-10, 10, 20]: test(state), 0.25, delta)

    // easing.damp3(state.camera.lookAt, snap.intro ? [0, 0, 0]: null, 0.25, delta)
    // controls = snap.intro
    // easing.dampE(group_ref.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta)
  // console.log(...snap.cam_pos[snap.intro?1:0])
    easing.dampLookAt(
      state.camera,
      snap.cam_pos[snap.intro?0:1],
      0.1,
      delta,
    )
  
    // console.log(group_ref)


  })
  
  return(
    <>
    <spotLight position={[0, 10, 20]} penumbra={1} castShadow angle={0.2} />
    <EffectComposer autoClear={false} disableNormalPass>
          <N8AO aoRadius={1} intensity={2} />
          <TiltShift2 blur={0.075} />
          <Outline visibleEdgeColor="purple" hiddenEdgeColor="purple" blur kernelSize={KernelSize.LARGE} width={size.width * 1.25} edgeStrength={100} />
          <ToneMapping />
        </EffectComposer>
        <CameraControls ref={cameraControlsRef} enabled={false}/>
        <group ref={group_ref}>
        <Float speed={snap.intro?0:2} rotationIntensity={1} floatIntensity={5}>
                <Grid position={[0, 0.05, 0]} args={[10.5, 10.5]} {...gridConfig} />

          {children}
        </Float>
        </group>
        <Environment preset="city">
          <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
        </Environment> 
        </>
        )
}


export function Model2(props) {
  const ref = useRef()
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/Mosaic_syst2.gltf')
  // Hover state
  const [hovered, hover] = useState(null)
  // Debounce hover a bit to stop the ticker from being erratic , state.element = 1
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name)) 
  useFrame((state, delta) => {
    // console.log(snap)
  })
  function te(f){
    // console.log(f)
    state.element = f
    // console.log(state)

  }
  return (
    <group {...props} dispose={null}>
      <Select 
      enabled={hovered === "Photodiode"} 
      onPointerOver={over("Photodiode")} 
      onPointerOut={() => debouncedHover(null)}
      onClick={(e) => (e.stopPropagation(), te("Photodiode"))}
      // onPointerMissed={() => (state.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state.element = e.object.name))}>
      >
      <group position={[1.859, 2.328, -5.834]} rotation={[0, Math.PI / 2, 0]} scale={[1, 2.859, 2.859]}>
        <mesh geometry={nodes.Vert001.geometry} material={materials.Metal_Rou} />
        <mesh geometry={nodes.Vert001_1.geometry} material={materials.Photodiode} />
      </group>
      </Select>
      <mesh geometry={nodes.Pied004.geometry} material={materials['Metal_Rou.004']} position={[1.829, 0.514, -5.16]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <Select enabled={hovered === "Lentilles"} onPointerOver={over("Lentilles")} onPointerOut={() => debouncedHover(null)}>
        <mesh geometry={nodes.L8.geometry} position={[1.902, 2.257, -1.409]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
      </Select>
      <Select enabled={hovered === "Tube Lense"} onPointerOver={over("Tube Lense")} onPointerOut={() => debouncedHover(null)}>
        <mesh geometry={nodes.L7.geometry} position={[-3.722, 2.26, 1.065]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
        <mesh geometry={nodes.L6.geometry} position={[-4.315, 2.251, 1.052]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
      </Select>
      <Select enabled={hovered === "Scan Lense"} onPointerOver={over("Scan Lense")} onPointerOut={() => debouncedHover(null)}>
        <mesh geometry={nodes.L4.geometry} position={[-7.758, 2.267, 0.98]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
        <mesh geometry={nodes.L2.geometry} position={[-8.539, 2.26, 0.992]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
        <mesh geometry={nodes.L3.geometry} position={[-8.228, 2.26, 0.992]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
        <mesh geometry={nodes.L1.geometry} position={[-9.091, 2.26, 0.992]} >
          <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
        </mesh>
      </Select>
      <Select enabled={hovered === "Lentille de Schmit"} onPointerOver={over("Lentille de Schmit")} onPointerOut={() => debouncedHover(null)}>
        <mesh geometry={nodes.L_S.geometry} position={[5.034, 2.258, 1.074]} scale={[0.777, 1, 1]} >
            <MeshTransmissionMaterial backsideThickness={10} thickness={5} />
          </mesh>
      </Select>
      <Select enabled={hovered === "Miroir Spherique"} onPointerOver={over("Miroir Spherique")} onPointerOut={() => debouncedHover(null)}>
        <group position={[8.597, 2.254, 1.034]}>
          <mesh geometry={nodes.Vert010.geometry} material={materials.Metal} />
          <mesh geometry={nodes.Vert010_1.geometry} material={materials.Verre_R} />
        </group>
      </Select>
      <mesh geometry={nodes.M1.geometry} material={materials.Metal} position={[-10.095, 1.731, -6.145]} rotation={[0, 0.813, 0]} scale={[0.5, 0.5, 0.05]} />
      <group position={[6.818, 1.596, 1.022]} rotation={[Math.PI / 2, 0, 0]} scale={0.071}>
        <mesh geometry={nodes['DFM1B_M-Solidworks'].geometry} material={materials.Metal_black} />
        <mesh geometry={nodes['DFM1B_M-Solidworks_1'].geometry} material={nodes['DFM1B_M-Solidworks_1'].material} />
      </group>
      <mesh geometry={nodes.Monture_3_Axes.geometry} material={materials.Metal_black} position={[-10.954, 0.939, -6.84]} rotation={[Math.PI / 2, 0, 2.356]} scale={0.023} />
      <mesh geometry={nodes.Breadbord.geometry} material={materials.Breadbord} position={[-0.649, -0.276, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.032} />
      <Select enabled={hovered === "Galvanometre"} onPointerOver={over("Galvanometre")} onPointerOut={() => debouncedHover(null)}>
        <group position={[-11.141, 1.508, 2.21]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.068}>
          <mesh geometry={nodes['QS7XY-Y3-Solidworks'].geometry} material={materials.Metal_black} />
          <mesh geometry={nodes['QS7XY-Y3-Solidworks_1'].geometry} material={materials.Verre_R} />
          <mesh geometry={nodes['QS7XY-Y3-Solidworks_2'].geometry} material={materials.Metal} />
        </group>
      </Select>
      <Select enabled={hovered === "Beam extender"} onPointerOver={over("Beam extender")} onPointerOut={() => debouncedHover(null)}>
        <group position={[-6.651, 1.734, -6.065]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.023}>
          <mesh geometry={nodes['TC25FC-850-Solidworks'].geometry} material={materials.Metal_black} />
          <mesh geometry={nodes['TC25FC-850-Solidworks_1'].geometry} material={materials.Metal_Rou} />
          <mesh geometry={nodes['TC25FC-850-Solidworks_2'].geometry} material={materials.Verre} />
        </group>
      </Select>
      <Select enabled={hovered === "Lame dichroïque"} onPointerOver={over("Lame dichroïque")} onPointerOut={() => debouncedHover(null)}>
        <group position={[1.733, 2.116, 1.26]} rotation={[Math.PI / 2, 0, -2.356]} scale={0.042}>
          <mesh geometry={nodes['KM200SL-Solidworks'].geometry} material={materials.Metal_black} />
          <mesh geometry={nodes['KM200SL-Solidworks_1'].geometry} material={materials.Metal_Rou} />
          <mesh geometry={nodes['KM200SL-Solidworks_2'].geometry} material={materials.Metal_Semi} />
          <mesh geometry={nodes['KM200SL-Solidworks_3'].geometry} material={materials.Verre_R} />
        </group>
      </Select>
      <Select enabled={hovered === "Laser"} onPointerOver={over("Laser")} onPointerOut={() => debouncedHover(null)}>
        <group position={[-3.272, 1.744, -6.06]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.023}>
          <mesh geometry={nodes['LDM850-Solidworks'].geometry} material={materials.Metal_Laser} />
          <mesh geometry={nodes['LDM850-Solidworks_1'].geometry} material={materials.Metal} />
          <mesh geometry={nodes['LDM850-Solidworks_2'].geometry} material={materials.Material} />
        </group>
      </Select>
      <mesh geometry={nodes.Pied001.geometry} material={materials['Metal_Rou.001']} position={[1.339, -0.386, 1.19]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh geometry={nodes.Pied002.geometry} material={materials['Metal_Rou.002']} position={[-3.431, 0.184, -6.06]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh geometry={nodes.Pied003.geometry} material={materials['Metal_Rou.003']} position={[-6.611, 0.184, -6.06]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <group position={[6,5,-6]} rotation={[-Math.PI/7, 0, 0]}>
      <Text  color="black" fontSize={1} letterSpacing={-0.05} >
        {hovered ? hovered : "Projet Mosaic"}
      </Text>
      </group>
    </group>
  )
}


function Model(props) {
  const { fluorays, rays } = useControls({ fluorays: false, rays: true })
  // const {fluorays, rays} = useRef(false)
  const [active, setActive] = useState(false);


  const { scale } = useSpring({ 
    scale: active ? 1.5 : 1,
    config: config.wobbly
  })
  const { nodes, materials } = useGLTF('/Mosaic_syst.glb')
  useFrame(({  }) => {
    // setActive(!active)
    console.log()
  });

  return (
    <group {...props} dispose={null}>
      
      <mesh geometry={nodes.Cylinder.geometry} material={materials.Verre} position={[6.829, 3.561, 0.842]} scale={[0.077, 0.735, 0.077]} />
      <mesh geometry={nodes.embryo.geometry} material={materials.embryo} position={[6.836, 2.458, 0.648]} rotation={[2.418, 0.056, 0.049]} scale={0.205}/>
      
      <animated.mesh scale={scale} onClick={() => setActive(!active)}>
      <mesh geometry={nodes.Pince.geometry} material={materials.pince} position={[5.422, 0, -4.781]} rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
        <mesh geometry={nodes['assemblage_pince_v2_-_MMP-2XY-Solidworklls-1'].geometry} material={materials.pince} />
      </mesh>
      </animated.mesh>
      <mesh geometry={nodes.L8.geometry} material={materials.verre_chroma} position={[1.902, 2.472, -1.558]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L_S.geometry} material={materials.Verre} position={[5.034, 2.501, 0.8]} scale={[0.777, 1, 1]}>
        <MeshTransmissionMaterial roughness={0.5} backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L7.geometry} material={materials.verre_chroma} position={[-3.722, 2.475, 0.819]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L6.geometry} material={materials.verre_chroma} position={[-4.315, 2.466, 0.831]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L4.geometry} material={materials.verre_chroma} position={[-7.758, 2.482, 0.831]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L2.geometry} material={materials.verre_chroma} position={[-8.539, 2.475, 0.842]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L3.geometry} material={materials.verre_chroma} position={[-8.228, 2.475, 0.842]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <mesh geometry={nodes.L1.geometry} material={materials.verre_chroma} position={[-9.091, 2.475, 0.842]}>
        <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
      </mesh>
      <group position={[8.597, 2.501, 0.8]}>
        <mesh geometry={nodes.Vert010.geometry} material={materials.Metal} />
        <mesh geometry={nodes.Vert010_1.geometry} material={materials.Verre_R} />
      </group>
      <mesh geometry={nodes.M1.geometry} material={materials.Metal} position={[-10.095, 1.731, -5.986]} rotation={[0, 0.813, 0]} scale={[0.5, 0.5, 0.05]} />
      <group position={[6.824, 1.857, 0.787]} rotation={[Math.PI / 2, 0, 0]} scale={0.071}>
        <mesh geometry={nodes['DFM1B_M-Solidworks'].geometry} material={materials.Metal_black} />
        <mesh geometry={nodes['DFM1B_M-Solidworks_1'].geometry} material={nodes['DFM1B_M-Solidworks_1'].material} />
      </group>
      <mesh geometry={nodes.Monture_3_Axes.geometry} material={materials.Metal_black} position={[-10.954, 0.939, -6.681]} rotation={[Math.PI / 2, 0, 2.356]} scale={0.023} />
      <mesh geometry={nodes.Breadbord.geometry} material={materials.Breadbord} position={[-0.649, -0.276, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.032} />
      <group position={[-11.141, 1.656, 2.21]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.074}>
        <mesh geometry={nodes['QS7XY-Y3-Solidworks'].geometry} material={materials.Metal_black} />
        <mesh geometry={nodes['QS7XY-Y3-Solidworks_1'].geometry} material={materials.Verre_R} />
        <mesh geometry={nodes['QS7XY-Y3-Solidworks_2'].geometry} material={materials.Metal} />
      </group>
      <group position={[-6.651, 1.85, -5.983]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.034}>
        <mesh geometry={nodes['TC25FC-850-Solidworks'].geometry} material={materials.Metal_black} />
        <mesh geometry={nodes['TC25FC-850-Solidworks_1'].geometry} material={materials.Metal_Rou} />
        <mesh geometry={nodes['TC25FC-850-Solidworks_2'].geometry} material={materials.Verre} />
      </group>
      <group position={[1.747, 2.331, 1.262]} rotation={[Math.PI / 2, 0, -2.356]} scale={0.042}>
        <mesh geometry={nodes['KM200SL-Solidworks'].geometry} material={materials.Metal_black} />
        <mesh geometry={nodes['KM200SL-Solidworks_1'].geometry} material={materials.Metal_Rou} />
        <mesh geometry={nodes['KM200SL-Solidworks_2'].geometry} material={materials.Metal_Semi} />
        <mesh geometry={nodes['KM200SL-Solidworks_3'].geometry} material={materials.Verre_R} />
      </group>
      <group position={[-3.272, 1.88, -5.991]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.03}>
        <mesh geometry={nodes['LDM850-Solidworks'].geometry} material={materials.Metal_Laser} />
        <mesh geometry={nodes['LDM850-Solidworks_1'].geometry} material={materials.Metal} />
        <mesh geometry={nodes['LDM850-Solidworks_2'].geometry} material={materials.Material} />
      </group>
      <mesh geometry={nodes.Pied001.geometry} material={materials['Metal_Rou.001']} position={[1.339, -0.207, 1.19]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh geometry={nodes.Pied002.geometry} material={materials['Metal_Rou.002']} position={[-3.431, 0.184, -5.969]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh geometry={nodes.Pied003.geometry} material={materials['Metal_Rou.003']} position={[-6.611, 0.227, -5.972]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh geometry={nodes['PDA44-Solidworks'].geometry} material={materials.Metal_black} position={[1.883, 2.699, -5.534]} rotation={[Math.PI / 2, 0, 0]} scale={0.037} />
      <mesh geometry={nodes.Pied004.geometry} material={materials['Metal_Rou.004']} position={[2.177, 0.38, -5.16]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
      <mesh visible={rays} geometry={nodes.Cone.geometry} material={materials['Laser.007']} position={[7.673, 2.468, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} color={"#b2526b"} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={fluorays} geometry={nodes.Cone.geometry} material={materials['Laser.007']} position={[7.673, 2.468, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} color={"#52b2ac"} emissive={"#52b2ac"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder001.geometry} material={materials.Laser} position={[-5.492, 1.854, -5.98]} rotation={[0, 0, -Math.PI / 2]} scale={[0.022, 0.503, 0.022]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder002.geometry} material={materials['Laser.001']} position={[-10.053, 1.854, -4.245]} rotation={[Math.PI / 2, 1.571, 0]} scale={[0.19, 4.265, 0.19]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder003.geometry} material={materials['Laser.002']} position={[-8.277, 1.854, -5.98]} rotation={[0, 0, -Math.PI / 2]} scale={[0.19, 4.265, 0.19]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder004.geometry} material={materials['Laser.003']} position={[-10.137, 2.377, 0.835]} rotation={[0, 0, 0.275]} scale={[0.19, 4.265, 0.19]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder005.geometry} material={materials['Laser.004']} position={[-10.206, 2.474, 0.831]} rotation={[0, 0, -Math.PI / 2]} scale={[0.19, 4.265, 0.19]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={fluorays} geometry={nodes.Cylinder006.geometry} material={materials['Laser.006']} position={[1.873, 2.472, 0.774]} rotation={[-Math.PI / 2, 1.571, 0]} scale={[0.581, 13.013, 0.581]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#52b2ac"}/>
      </mesh>
      <mesh visible={rays} geometry={nodes.Cylinder007.geometry} material={materials['Laser.008']} position={[1.001, 2.472, 0.774]} rotation={[0, 0, -Math.PI / 2]} scale={[0.581, 13.013, 0.581]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#b2526b"}/>
      </mesh>
      <mesh visible={fluorays} geometry={nodes.Cylinder008.geometry} material={materials['Laser.009']} position={[1.001, 2.472, 0.774]} rotation={[0, 0, -Math.PI / 2]} scale={[0.592, 13.013, 0.592]}>
        <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2*2} thickness={0} ior={1} emissive={"#52b2ac"}/>
      </mesh>
      <mesh visible = {false} geometry={nodes.Cube.geometry} material={materials.cube} position={[6.627, 2.072, 0.831]} scale={[1.891, 1.68, 1.693]}>
        <MeshTransmissionMaterial backsideThickness={10} chromaticAberration={0.015} thickness={5} temporalDistortion={0.1} distortion={0.2} ior={1.1}/>
      </mesh>
    </group>
  )
}

useGLTF.preload('/Mosaic_syst.glb')



function Bkgnd(props) {
	const snap = useSnapshot(state)	
	const bk_ref = useRef()

	useFrame((state, delta) => {
		// console.log(bk_ref.current)
		easing.dampC(bk_ref.current, snap.color, 0.25, delta)
	})

	return (
	<color ref={bk_ref} attach="background" args={["#FEF3D6"]} />
	)
}

// function Sol(props) {
//   const scroll2 = useScroll()
//   const pos = 0
//   const sol_ref = useRef()

//   useFrame(() => {
//     sol_ref.current.position.set(0, -7.5*(1+5*scroll2.offset), 0)
//     }, [])  
  
//   return (
//     <ContactShadows ref={sol_ref} scale={100} position={[0, -7.5*(1), 0]} blur={1} far={100} opacity={0.85} />
//     )
// }


export default Scene3D
