import { useEffect, useState, useRef, useCallback } from "react"
// import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Outline, EffectComposer, Selection, Select, N8AO, TiltShift2, ToneMapping } from "@react-three/postprocessing"
import {CameraControls, Grid, Caustics, useAnimations, useGLTF, Float, Lightformer, Text, Html, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei"
// import { useControls } from 'leva'
import { easing } from "maath"
import { debounce } from "lodash"
import { KernelSize } from 'postprocessing'
import { useSnapshot } from 'valtio'
import { state_v } from './Store'
import { useSpring, animated, config } from '@react-spring/three'



// useGLTF.preload('/Mosaic_syst2.gltf')
function Scene3D() {
  return (
    <>
    <Canvas gl={{ preserveDrawingBuffer: true }} eventSource={document.getElementById('root')} eventPrefix="client" shadows camera={{ position: [0, 10, 25], fov: 50 }}>
    
    <Bkgnd/>
            {/*<Status/>*/}
    <Selection>
    <Rig>
    <Model scale={1} position={[0,0,0]} rotation={[0, 0, 0]}/>
    </Rig>
    </Selection>
            {/*<Sol />*/}
            {/*</Rig>*/}
    

    </Canvas>
    </>
    )
}






function Rig({ children }) {
  const snap = useSnapshot(state_v)
  const { size } = useThree()
  const {cameraControlsRef, spot_ref} = useRef()
  const group_ref = useRef()

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
    // Ici les fonctions de mouvements de la caméra de l'intro
      easing.damp3(
        state.camera.position,
        [Math.sin(-state.pointer.x) * 10-8, state.pointer.y * 3.5+10, 15 + Math.cos(state.pointer.x) * 10],
        0.25,
        delta,
        )
      easing.dampLookAt(
        state.camera,
        snap.intro ? [-8,-1,0] : [0,0,-15],
        0.1,
        delta,
        )
    }
    
    else {
    // Ici les fonctions de mouvements de la caméra de l'exploration
      easing.damp3(
        state.camera.position,
        snap.cam_pos[snap.etape],
        0.5,
        delta,
        )
      easing.dampLookAt(
        state.camera,
        snap.cam_look[snap.etape],
        0.3,
        delta,
        )
    }
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
        {/*<Float speed={snap.intro?2:0} rotationIntensity={0.5} floatIntensity={1}>*/}
    <Grid visible={snap.intro} position={[0, 0.05, 0]} args={[10.5, 10.5]} {...gridConfig} />

    {children}
        {/*</Float>*/}
    </group>
    <Environment preset="city">
    <Lightformer intensity={8} position={[10, 5, 0]} scale={[10, 50, 1]} onUpdate={(self) => self.lookAt(0, 0, 0)} />
    </Environment> 
    </>
    )
}


function Model(props) {
  // const { fluorays, rays } = useControls({ fluorays: false, rays: true })
  // const {fluorays, rays} = useRef(false)
  // const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const snap = useSnapshot(state_v)
  const dico={
    0:"Mosaic",
    1:"Laser & Beam extender",
    2:"Galvanomètre",
    3:"Scan Lenses",
    4:"Tube Lense",
    5:"Cuve",
    6:"Lame de Schmit",
    7:"Miroir Sphérique",
    8:"Embryon de poulet",
    9:"Miroir Dicroique",
    10:"Photomultiplicateur",
  }
  // const { scale } = useSpring({ 
  //   scale: active ? 1.5 : 1,
  //   config: config.wobbly
  // })
  const { nodes, materials } = useGLTF('Mosaic_syst.glb')
  // useFrame((state, delta) => {
  //   // setActive(!active)
  //   console.log()
  // });
  // Hover state
  const [hovered, hover] = useState(null)
  // Debounce hover a bit to stop the ticker from being erratic , state_v.element = 1
  const debouncedHover = useCallback(debounce(hover, 30), [])
  const over = (name) => (e) => (e.stopPropagation(), debouncedHover(name)) 
  // const te = (f) => (state_v.element = dico[f], state_v.etape=f) 
  function te(f){
    state_v.etape=f
    state_v.element = dico[f]
  }
  return (
    <group {...props} dispose={null}>
    <group visible={!snap.intro} position={[-6,5,-10]} rotation={[-Math.PI/7, 0, 0]}>
    <Text  color="black" fontSize={1} letterSpacing={-0.05} >
    {hovered ? dico[hovered] : "Projet Mosaic"}
    </Text>
    </group>
    <mesh geometry={nodes.Cylinder.geometry} material={materials.Verre} position={[6.829, 3.561, 0.842]} scale={[0.077, 0.735, 0.077]} />
    <mesh geometry={nodes.embryo.geometry} material={materials.embryo} position={[6.836, 2.458, 0.648]} rotation={[2.418, 0.056, 0.049]} scale={0.205}/>

    {/*<animated.mesh scale={scale} onClick={() => setActive(!active)}>*/}
    <mesh geometry={nodes.Pince.geometry} material={materials.pince} position={[5.422, 0, -4.4]} rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
    <mesh geometry={nodes['assemblage_pince_v2_-_MMP-2XY-Solidworklls-1'].geometry} material={materials.pince} />
    </mesh>
    {/*</animated.mesh>*/}
    <mesh geometry={nodes.L8.geometry} material={materials.verre_chroma} position={[1.902, 2.472, -1.558]}>
    <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
    </mesh>
    <mesh geometry={nodes.L_S.geometry} material={materials.Verre} position={[5.034, 2.501, 0.8]} scale={[0.777, 1, 1]}>
    <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
    </mesh>
    <Select 
    enabled={hovered === "4"} 
    onPointerOver={over("4")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(4))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <mesh geometry={nodes.L7.geometry} material={materials.verre_chroma} position={[-3.722, 2.475, 0.819]}>
    <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
    </mesh>
    <mesh geometry={nodes.L6.geometry} material={materials.verre_chroma} position={[-4.315, 2.466, 0.831]}>
    <MeshTransmissionMaterial backsideThickness={10} thickness={5} resolution={32*32} color={"#d4fcfc"}/>
    </mesh>
    </Select>
    <Select 
    enabled={hovered === "3"} 
    onPointerOver={over("3")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(3))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
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
    </Select>
    <group position={[8.597, 2.501, 0.8]}>
    <mesh geometry={nodes.Vert010.geometry} material={materials.Metal} />
    <mesh geometry={nodes.Vert010_1.geometry} material={materials.Verre_R} />
    </group>
    <mesh geometry={nodes.M1.geometry} material={materials.Metal} position={[-10.095, 1.731, -5.986]} rotation={[0, 0.813, 0]} scale={[0.5, 0.5, 0.05]} />
    <Select 
    enabled={hovered === "5"} 
    onPointerOver={over("5")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(5))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <group visible={!(snap.etape==6)&&!(snap.etape==5)&&!(snap.etape==7)&&!(snap.etape==8)} position={[6.824, 1.857, 0.787]} rotation={[Math.PI / 2, 0, 0]} scale={0.071}>
    <mesh geometry={nodes['DFM1B_M-Solidworks'].geometry} material={materials.Metal_black} />
    <mesh geometry={nodes['DFM1B_M-Solidworks_1'].geometry} material={nodes['DFM1B_M-Solidworks_1'].material} />
    </group>
    </Select>
    <mesh geometry={nodes.Monture_3_Axes.geometry} material={materials.Metal_black} position={[-10.954, 0.939, -6.681]} rotation={[Math.PI / 2, 0, 2.356]} scale={0.023} />
    <mesh geometry={nodes.Breadbord.geometry} material={materials.Breadbord} position={[-0.649, -0.276, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.032} />
    <Select 
    enabled={hovered === "2"} 
    onPointerOver={over("2")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(2))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <group position={[-11.141, 1.656, 2.21]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.074}>
    <mesh geometry={nodes['QS7XY-Y3-Solidworks'].geometry} material={materials.Metal_black} />
    <mesh geometry={nodes['QS7XY-Y3-Solidworks_1'].geometry} material={materials.Verre_R} />
    <mesh geometry={nodes['QS7XY-Y3-Solidworks_2'].geometry} material={materials.Metal} />
    </group>
    </Select>
    <Select 
    enabled={hovered === "1"} 
    onPointerOver={over("1")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(1))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <group position={[-6.651, 1.85, -5.983]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.034}>
    <mesh geometry={nodes['TC25FC-850-Solidworks'].geometry} material={materials.Metal_black} />
    <mesh geometry={nodes['TC25FC-850-Solidworks_1'].geometry} material={materials.Metal_Rou} />
    <mesh geometry={nodes['TC25FC-850-Solidworks_2'].geometry} material={materials.Verre} />
    </group>
    </Select>
    <Select 
    enabled={hovered === "9"} 
    onPointerOver={over("9")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(9))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <group position={[1.747, 2.331, 1.262]} rotation={[Math.PI / 2, 0, -2.356]} scale={0.042}>
    <mesh geometry={nodes['KM200SL-Solidworks'].geometry} material={materials.Metal_black} />
    <mesh geometry={nodes['KM200SL-Solidworks_1'].geometry} material={materials.Metal_Rou} />
    <mesh geometry={nodes['KM200SL-Solidworks_2'].geometry} material={materials.Metal_Semi} />
    <mesh geometry={nodes['KM200SL-Solidworks_3'].geometry} material={materials.Verre_R} />
    </group>
    </Select>
    <Select 
    enabled={hovered === "1"} 
    onPointerOver={over("1")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(1))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <group position={[-3.272, 1.88, -5.991]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.03}>
    <mesh geometry={nodes['LDM850-Solidworks'].geometry} material={materials.Metal_Laser} />
    <mesh geometry={nodes['LDM850-Solidworks_1'].geometry} material={materials.Metal} />
    <mesh geometry={nodes['LDM850-Solidworks_2'].geometry} material={materials.Material} />
    </group>
    </Select>
    <mesh geometry={nodes.Pied001.geometry} material={materials['Metal_Rou.001']} position={[1.339, -0.207, 1.19]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
    <mesh geometry={nodes.Pied002.geometry} material={materials['Metal_Rou.002']} position={[-3.431, 0.184, -5.969]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
    <mesh geometry={nodes.Pied003.geometry} material={materials['Metal_Rou.003']} position={[-6.611, 0.227, -5.972]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
    <Select 
    enabled={hovered === "10"} 
    onPointerOver={over("10")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(10))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <mesh geometry={nodes['PDA44-Solidworks'].geometry} material={materials.Metal_black} position={[1.883, 2.699, -5.534]} rotation={[Math.PI / 2, 0, 0]} scale={0.037} />
    </Select>
    <mesh geometry={nodes.Pied004.geometry} material={materials['Metal_Rou.004']} position={[2.177, 0.38, -5.16]} rotation={[Math.PI / 2, 0, 0]} scale={0.023} />
    <mesh visible={snap.rays} geometry={nodes.Cone.geometry} material={materials['Laser.007']} position={[7.673, 2.468, 0.8]} rotation={[0, 0, Math.PI / 2]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} color={"#b2526b"} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.fluorays} geometry={nodes.Cone.geometry} material={materials['Laser.007']} position={[7.673, 2.468, 0.8]} rotation={[0, 0, Math.PI / 2]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} color={"#52b2ac"} emissive={"#52b2ac"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder001.geometry} material={materials.Laser} position={[-5.492, 1.854, -5.98]} rotation={[0, 0, -Math.PI / 2]} scale={[0.022, 0.503, 0.022]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder002.geometry} material={materials['Laser.001']} position={[-10.053, 1.854, -4.245]} rotation={[Math.PI / 2, 1.571, 0]} scale={[0.19, 4.265, 0.19]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder003.geometry} material={materials['Laser.002']} position={[-8.277, 1.854, -5.98]} rotation={[0, 0, -Math.PI / 2]} scale={[0.19, 4.265, 0.19]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder004.geometry} material={materials['Laser.003']} position={[-10.137, 2.377, 0.835]} rotation={[0, 0, 0.275]} scale={[0.19, 4.265, 0.19]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder005.geometry} material={materials['Laser.004']} position={[-10.206, 2.474, 0.831]} rotation={[0, 0, -Math.PI / 2]} scale={[0.19, 4.265, 0.19]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.fluorays} geometry={nodes.Cylinder006.geometry} material={materials['Laser.006']} position={[1.873, 2.472, 0.774]} rotation={[-Math.PI / 2, 1.571, 0]} scale={[0.581, 13.013, 0.581]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#52b2ac"}/>
    </mesh>
    <mesh visible={snap.rays} geometry={nodes.Cylinder007.geometry} material={materials['Laser.008']} position={[1.001, 2.472, 0.774]} rotation={[0, 0, -Math.PI / 2]} scale={[0.581, 13.013, 0.581]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#b2526b"}/>
    </mesh>
    <mesh visible={snap.fluorays} geometry={nodes.Cylinder008.geometry} material={materials['Laser.009']} position={[1.001, 2.472, 0.774]} rotation={[0, 0, -Math.PI / 2]} scale={[0.592, 13.013, 0.592]}>
    <MeshTransmissionMaterial backsideThickness={0} chromaticAberration={0} resolution={512*2} thickness={0} ior={1} emissive={"#52b2ac"}/>
    </mesh>
    <Select 
    enabled={hovered === "6"} 
    onPointerOver={over("6")} 
    onPointerOut={() => debouncedHover(null)}
    onClick={(e) => (e.stopPropagation(), te(6))}
      // onPointerMissed={() => (state_v.element = null)}
      // onClick={(e) => (e.stopPropagation(), (state_v.element = e.object.name))}>
    >
    <mesh visible = {snap.etape==5} geometry={nodes.Cube.geometry} material={materials.cube} position={[6.627, 2.072, 0.831]} scale={[1.891, 1.68, 1.693]}>
    <MeshTransmissionMaterial backsideThickness={10} chromaticAberration={0.015} thickness={5} temporalDistortion={0.15} distortion={0.2} ior={1.1}/>
    </mesh>
    </Select>

    </group>
    )
}

useGLTF.preload('Mosaic_syst.glb')



function Bkgnd(props) {
	const snap = useSnapshot(state_v)	
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
