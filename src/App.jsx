// import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot, proxy } from 'valtio'
// import { PiVirtualRealityDuotone } from "react-icons/pi";
import { state_v } from './Store'
import Scene3D from './Canvas'
import { useEffect, Suspense, useState, useRef, useCallback } from "react"


function App() {
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <Scene3D/>
    </Suspense>
    <Overlay/>
    {/*<Loading/>*/}
    </>
    )
}


const Loading=()=>{
  return(
    <div id="loader-container">
    <svg id="loader" width="285" height="59" viewBox="0 0 285 59" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="path-1-outside-1_1_6" maskUnits="userSpaceOnUse" x="0.636353" y="0.818176" width="284" height="58" fill="black">
    <rect fill="white" x="0.636353" y="0.818176" width="284" height="58"/>
    <path d="M5.63635 53V6.45454H11.2727V48H32.9091V53H5.63635Z"/>
    <path d="M79.0966 29.7273C79.0966 34.6364 78.2102 38.8788 76.4375 42.4545C74.6648 46.0303 72.2329 48.7879 69.142 50.7273C66.0511 52.6667 62.5208 53.6364 58.5511 53.6364C54.5814 53.6364 51.0511 52.6667 47.9602 50.7273C44.8693 48.7879 42.4375 46.0303 40.6648 42.4545C38.892 38.8788 38.0057 34.6364 38.0057 29.7273C38.0057 24.8182 38.892 20.5758 40.6648 17C42.4375 13.4242 44.8693 10.6667 47.9602 8.72727C51.0511 6.78787 54.5814 5.81818 58.5511 5.81818C62.5208 5.81818 66.0511 6.78787 69.142 8.72727C72.2329 10.6667 74.6648 13.4242 76.4375 17C78.2102 20.5758 79.0966 24.8182 79.0966 29.7273ZM73.642 29.7273C73.642 25.697 72.9678 22.2955 71.6193 19.5227C70.286 16.75 68.4754 14.6515 66.1875 13.2273C63.9148 11.803 61.3693 11.0909 58.5511 11.0909C55.7329 11.0909 53.1799 11.803 50.892 13.2273C48.6193 14.6515 46.8087 16.75 45.4602 19.5227C44.1269 22.2955 43.4602 25.697 43.4602 29.7273C43.4602 33.7576 44.1269 37.1591 45.4602 39.9318C46.8087 42.7045 48.6193 44.803 50.892 46.2273C53.1799 47.6515 55.7329 48.3636 58.5511 48.3636C61.3693 48.3636 63.9148 47.6515 66.1875 46.2273C68.4754 44.803 70.286 42.7045 71.6193 39.9318C72.9678 37.1591 73.642 33.7576 73.642 29.7273Z"/>
    <path d="M88.2954 53H82.3864L99.4773 6.45454H105.295L122.386 53H116.477L102.568 13.8182H102.205L88.2954 53ZM90.4773 34.8182H114.295V39.8182H90.4773V34.8182Z"/>
    <path d="M144 53H129.636V6.45454H144.636C149.152 6.45454 153.015 7.38636 156.227 9.25C159.439 11.0985 161.901 13.7576 163.614 17.2273C165.326 20.6818 166.182 24.8182 166.182 29.6364C166.182 34.4848 165.318 38.6591 163.591 42.1591C161.864 45.6439 159.348 48.3258 156.045 50.2045C152.742 52.0682 148.727 53 144 53ZM135.273 48H143.636C147.485 48 150.674 47.2576 153.205 45.7727C155.735 44.2879 157.621 42.1742 158.864 39.4318C160.106 36.6894 160.727 33.4242 160.727 29.6364C160.727 25.8788 160.114 22.6439 158.886 19.9318C157.659 17.2045 155.826 15.1136 153.386 13.6591C150.947 12.1894 147.909 11.4545 144.273 11.4545H135.273V48Z"/>
    <path d="M181.273 6.45454V53H175.636V6.45454H181.273Z"/>
    <path d="M229.483 6.45454V53H224.028L198.665 16.4545H198.21V53H192.574V6.45454H198.028L223.483 43.0909H223.937V6.45454H229.483Z"/>
    <path d="M272.58 21C272.08 19.4697 271.42 18.0985 270.602 16.8864C269.799 15.6591 268.837 14.6136 267.716 13.75C266.61 12.8864 265.352 12.2273 263.943 11.7727C262.534 11.3182 260.989 11.0909 259.307 11.0909C256.549 11.0909 254.042 11.803 251.784 13.2273C249.526 14.6515 247.731 16.75 246.398 19.5227C245.064 22.2955 244.398 25.697 244.398 29.7273C244.398 33.7576 245.072 37.1591 246.42 39.9318C247.769 42.7045 249.595 44.803 251.898 46.2273C254.201 47.6515 256.792 48.3636 259.67 48.3636C262.337 48.3636 264.686 47.7955 266.716 46.6591C268.761 45.5076 270.352 43.8864 271.489 41.7955C272.64 39.6894 273.216 37.2121 273.216 34.3636L274.943 34.7273H260.943V29.7273H278.67V34.7273C278.67 38.5606 277.852 41.8939 276.216 44.7273C274.595 47.5606 272.352 49.7576 269.489 51.3182C266.64 52.8636 263.367 53.6364 259.67 53.6364C255.549 53.6364 251.928 52.6667 248.807 50.7273C245.701 48.7879 243.276 46.0303 241.534 42.4545C239.807 38.8788 238.943 34.6364 238.943 29.7273C238.943 26.0454 239.436 22.7348 240.42 19.7954C241.42 16.8409 242.83 14.3258 244.648 12.25C246.466 10.1742 248.617 8.58333 251.102 7.47727C253.587 6.37121 256.322 5.81818 259.307 5.81818C261.761 5.81818 264.049 6.18939 266.17 6.93181C268.307 7.65908 270.208 8.69696 271.875 10.0454C273.557 11.3788 274.958 12.9773 276.08 14.8409C277.201 16.6894 277.973 18.7424 278.398 21H272.58Z"/>
    </mask>
    <path d="M5.63635 53V6.45454H11.2727V48H32.9091V53H5.63635Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M79.0966 29.7273C79.0966 34.6364 78.2102 38.8788 76.4375 42.4545C74.6648 46.0303 72.2329 48.7879 69.142 50.7273C66.0511 52.6667 62.5208 53.6364 58.5511 53.6364C54.5814 53.6364 51.0511 52.6667 47.9602 50.7273C44.8693 48.7879 42.4375 46.0303 40.6648 42.4545C38.892 38.8788 38.0057 34.6364 38.0057 29.7273C38.0057 24.8182 38.892 20.5758 40.6648 17C42.4375 13.4242 44.8693 10.6667 47.9602 8.72727C51.0511 6.78787 54.5814 5.81818 58.5511 5.81818C62.5208 5.81818 66.0511 6.78787 69.142 8.72727C72.2329 10.6667 74.6648 13.4242 76.4375 17C78.2102 20.5758 79.0966 24.8182 79.0966 29.7273ZM73.642 29.7273C73.642 25.697 72.9678 22.2955 71.6193 19.5227C70.286 16.75 68.4754 14.6515 66.1875 13.2273C63.9148 11.803 61.3693 11.0909 58.5511 11.0909C55.7329 11.0909 53.1799 11.803 50.892 13.2273C48.6193 14.6515 46.8087 16.75 45.4602 19.5227C44.1269 22.2955 43.4602 25.697 43.4602 29.7273C43.4602 33.7576 44.1269 37.1591 45.4602 39.9318C46.8087 42.7045 48.6193 44.803 50.892 46.2273C53.1799 47.6515 55.7329 48.3636 58.5511 48.3636C61.3693 48.3636 63.9148 47.6515 66.1875 46.2273C68.4754 44.803 70.286 42.7045 71.6193 39.9318C72.9678 37.1591 73.642 33.7576 73.642 29.7273Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M88.2954 53H82.3864L99.4773 6.45454H105.295L122.386 53H116.477L102.568 13.8182H102.205L88.2954 53ZM90.4773 34.8182H114.295V39.8182H90.4773V34.8182Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M144 53H129.636V6.45454H144.636C149.152 6.45454 153.015 7.38636 156.227 9.25C159.439 11.0985 161.901 13.7576 163.614 17.2273C165.326 20.6818 166.182 24.8182 166.182 29.6364C166.182 34.4848 165.318 38.6591 163.591 42.1591C161.864 45.6439 159.348 48.3258 156.045 50.2045C152.742 52.0682 148.727 53 144 53ZM135.273 48H143.636C147.485 48 150.674 47.2576 153.205 45.7727C155.735 44.2879 157.621 42.1742 158.864 39.4318C160.106 36.6894 160.727 33.4242 160.727 29.6364C160.727 25.8788 160.114 22.6439 158.886 19.9318C157.659 17.2045 155.826 15.1136 153.386 13.6591C150.947 12.1894 147.909 11.4545 144.273 11.4545H135.273V48Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M181.273 6.45454V53H175.636V6.45454H181.273Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M229.483 6.45454V53H224.028L198.665 16.4545H198.21V53H192.574V6.45454H198.028L223.483 43.0909H223.937V6.45454H229.483Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    <path d="M272.58 21C272.08 19.4697 271.42 18.0985 270.602 16.8864C269.799 15.6591 268.837 14.6136 267.716 13.75C266.61 12.8864 265.352 12.2273 263.943 11.7727C262.534 11.3182 260.989 11.0909 259.307 11.0909C256.549 11.0909 254.042 11.803 251.784 13.2273C249.526 14.6515 247.731 16.75 246.398 19.5227C245.064 22.2955 244.398 25.697 244.398 29.7273C244.398 33.7576 245.072 37.1591 246.42 39.9318C247.769 42.7045 249.595 44.803 251.898 46.2273C254.201 47.6515 256.792 48.3636 259.67 48.3636C262.337 48.3636 264.686 47.7955 266.716 46.6591C268.761 45.5076 270.352 43.8864 271.489 41.7955C272.64 39.6894 273.216 37.2121 273.216 34.3636L274.943 34.7273H260.943V29.7273H278.67V34.7273C278.67 38.5606 277.852 41.8939 276.216 44.7273C274.595 47.5606 272.352 49.7576 269.489 51.3182C266.64 52.8636 263.367 53.6364 259.67 53.6364C255.549 53.6364 251.928 52.6667 248.807 50.7273C245.701 48.7879 243.276 46.0303 241.534 42.4545C239.807 38.8788 238.943 34.6364 238.943 29.7273C238.943 26.0454 239.436 22.7348 240.42 19.7954C241.42 16.8409 242.83 14.3258 244.648 12.25C246.466 10.1742 248.617 8.58333 251.102 7.47727C253.587 6.37121 256.322 5.81818 259.307 5.81818C261.761 5.81818 264.049 6.18939 266.17 6.93181C268.307 7.65908 270.208 8.69696 271.875 10.0454C273.557 11.3788 274.958 12.9773 276.08 14.8409C277.201 16.6894 277.973 18.7424 278.398 21H272.58Z" stroke="white" strokeWidth="10" mask="url(#path-1-outside-1_1_6)"/>
    </svg>

    </div>
    )
}

function Overlay() {
  const snap = useSnapshot(state_v)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
    <AnimatePresence>
    {snap.intro ? (
      <motion.section key="main" {...config}>
      <div className="section--container">
      <motion.div
      key="title"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
      <h1>M.O.S A.I. C.</h1>
      </motion.div>
      <div className="support--content">
      <motion.div
      key="p"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        damping: 7,
        stiffness: 30,
        restDelta: 0.001,
        duration: 0.6,
        delay: 0.2,
        delayChildren: 0.2
      }}>
      <p>
      <strong>{"=> Découvrez"}</strong> notre simulation numérique d'un système de microscopie à deux photons.<br/>
      <strong>{"=> Deplacez vous"}</strong> sur le modele 3D.<br/><strong>{"=> Explorez"} </strong>
      les différents paramètres de la simulation
      </p>
      <button style={{ background: snap.color }} onClick={() => (state_v.intro = false)}>
      EXPLORER
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-rocket-takeoff" viewBox="0 0 16 16">
      <path d="M9.752 6.193c.599.6 1.73.437 2.528-.362s.96-1.932.362-2.531c-.599-.6-1.73-.438-2.528.361-.798.8-.96 1.933-.362 2.532"/>
      <path d="M15.811 3.312c-.363 1.534-1.334 3.626-3.64 6.218l-.24 2.408a2.56 2.56 0 0 1-.732 1.526L8.817 15.85a.51.51 0 0 1-.867-.434l.27-1.899c.04-.28-.013-.593-.131-.956a9 9 0 0 0-.249-.657l-.082-.202c-.815-.197-1.578-.662-2.191-1.277-.614-.615-1.079-1.379-1.275-2.195l-.203-.083a10 10 0 0 0-.655-.248c-.363-.119-.675-.172-.955-.132l-1.896.27A.51.51 0 0 1 .15 7.17l2.382-2.386c.41-.41.947-.67 1.524-.734h.006l2.4-.238C9.005 1.55 11.087.582 12.623.208c.89-.217 1.59-.232 2.08-.188.244.023.435.06.57.093q.1.026.16.045c.184.06.279.13.351.295l.029.073a3.5 3.5 0 0 1 .157.721c.055.485.051 1.178-.159 2.065m-4.828 7.475.04-.04-.107 1.081a1.54 1.54 0 0 1-.44.913l-1.298 1.3.054-.38c.072-.506-.034-.993-.172-1.418a9 9 0 0 0-.164-.45c.738-.065 1.462-.38 2.087-1.006M5.205 5c-.625.626-.94 1.351-1.004 2.09a9 9 0 0 0-.45-.164c-.424-.138-.91-.244-1.416-.172l-.38.054 1.3-1.3c.245-.246.566-.401.91-.44l1.08-.107zm9.406-3.961c-.38-.034-.967-.027-1.746.163-1.558.38-3.917 1.496-6.937 4.521-.62.62-.799 1.34-.687 2.051.107.676.483 1.362 1.048 1.928.564.565 1.25.941 1.924 1.049.71.112 1.429-.067 2.048-.688 3.079-3.083 4.192-5.444 4.556-6.987.183-.771.18-1.345.138-1.713a3 3 0 0 0-.045-.283 3 3 0 0 0-.3-.041Z"/>
      <path d="M7.009 12.139a7.6 7.6 0 0 1-1.804-1.352A7.6 7.6 0 0 1 3.794 8.86c-1.102.992-1.965 5.054-1.839 5.18.125.126 3.936-.896 5.054-1.902Z"/>
      </svg>
      {/*<AiOutlineHighlight size="1.3em" />*/}
      </button>
      </motion.div>
      </div>
      </div>
      <div className="decals">
      <div className="decals--container">
      <a href="https://github.com/Alex6Crbt/Mosaic/tree/web_app" target="_blank" rel="noopener noreferrer">{"Source >=> /Alex6Crbt/MOSAIC"}</a> 
      </div>
      </div>
      </motion.section>
      ) : (
      <motion.section key="custom" {...config}>
      <DialogB/>
      <ModalCard/>
      </motion.section>
      )}
      </AnimatePresence>
      </div>
      )
}


function DialogB() {
  const snap = useSnapshot(state_v)
  return (
    <div className="customizer">
    <div className="color-options">
    {snap.colors.map((color) => (
      <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state_v.color = color)}></div>
      ))}
    </div>
    <div className="decals">
    <div className="decals--container">
    {snap.element}<br/>
    {"Equipe >=> A. CORBILLET, D. DE DIETRICH, S. EA, M. MANNONI, E. REUCHIN"} <br/>
    {"Encadrants >=> G. LUCAS-LECLIN et J. MOREAU"}
    </div>
    </div>
    <button
    className="rays"
    style={{ background: snap.color }}
    onClick={() => {
      state_v.rays = !snap.rays
    }}>
    Rayons laser
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
    </svg>
    </button>
    <button
    className="fluorays"
    style={{ background: snap.color }}
    onClick={() => {
      state_v.fluorays = !snap.fluorays
    }}>
    Rayons fluorecents
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightning" viewBox="0 0 16 16">
    <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z"/>
    </svg>
    
    </button>
    <button className="exit" style={{ background: snap.color }} onClick={() => (state_v.intro = true)}>
    Accueil
    <AiOutlineArrowLeft size="1.3em" />
    </button>
    </div>
    )
}

function ModalCard() {
  const dico={
    0:"Microscopie haute-résolution à deux photons pour la biologie",
    1:"Laser & Beam extender",
    2:"Galvanomètre",
    3:"Scan Lenses",
    4:"Tube Lense",
    5:"Cuve",
    6:"Lame de Schmit",
    7:"Miroir Sphérique",
    8:"Embryon de poulet",
    9:"Miroir Dichroïque",
    10:"Photomultiplicateur",
  }
  const snap = useSnapshot(state_v)
  const [animation, setAnimation] = useState(false);
  const variants = {
    op1: {
      opacity: [ 0.5,0 , 0.1, 0.3, 0.6, 0.7,0.8,1],
    },
    op2: {
      opacity: [0.5, 0, 0.1, 0.3, 0.6, 0.71,0.8,1],
    }
  };
  const [clic, setClic] = useState(false);
  const handleClick_next = (event) => {
    event.stopPropagation()
    // Mettre à jour l'état du clic
    setClic(true);
    // console.log(snap.etape);
    state_v.etape = (snap.etape + 1) % 11
    if ((snap.etape + 1) % 11==5){
      state_v.fluorays = false
      state_v.rays = false
    }
    if ((snap.etape + 1) % 11==6){
      state_v.fluorays = false
      state_v.rays = true
    }
    if ((snap.etape + 1) % 11==7){
      state_v.fluorays = false
      state_v.rays = true
    }
    if ((snap.etape + 1) % 11==8){
      state_v.fluorays = true
      state_v.rays = false
    }
    if ((snap.etape + 1) % 11==10){
      state_v.fluorays = true
      state_v.rays = true
    }
  };

  const handleClick_prev= (event) => {
    event.stopPropagation()
    // Mettre à jour l'état du clic
    setClic(true);
    state_v.etape = (snap.etape - 1 + 11) % 11
    if ((snap.etape - 1 + 11) % 11==5){
      state_v.fluorays = false
      state_v.rays = false
    }
    if ((snap.etape - 1 + 11) % 11==6){
      state_v.fluorays = false
      state_v.rays = true
    }
    if ((snap.etape - 1 + 11) % 11==7){
      state_v.fluorays = false
      state_v.rays = true
    }
    if ((snap.etape - 1 + 11) % 11==8){
      state_v.fluorays = true
      state_v.rays = false
    }
    if ((snap.etape - 1 + 11) % 11==10){
      state_v.fluorays = true
      state_v.rays = true
    }
  };
  const handleClick_menu= (event) => {
    event.stopPropagation()
    // Mettre à jour l'état du clic
    setClic(true);
    state_v.etape = 0

  };

  // useEffect(() => {
  //   // Cette fonction sera exécutée à chaque fois que le state_v 'element' changera
  //   setAnimation((prevAnimation) => !prevAnimation);
  // }, [snap.element]); // La dépendance ici est 'snap.element', donc cette fonction useEffect sera exécutée chaque fois que 'snap.element' changera

  return (
    <motion.div key="animation-on-state" variants={variants} animate={animation?'op1' : 'op2'}>
    <div className="card">
    <div className="card__wrapper">
    <div className="card__menu" onClick={handleClick_prev}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
    </svg>
    </div>
    <div className="card__menu_2" onClick={handleClick_menu}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
    </svg>
    </div><div className="card__menu" onClick={handleClick_next}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
    </svg>
    </div>
    </div>
    <div className="card__indicator"><span className="card__indicator-amount">10</span> Étapes / <span className="card__indicator-percentage">{snap.etape*10}%</span></div>
    <div className="card__progress"><progress max="100" value={snap.etape*10}></progress></div>
    <div className="card__title">
    {snap.etape} : {dico[snap.etape]}
    </div>
    <div className="card__subtitle"> 
    {/*{ snap.img[snap.etape] ? <img src={snap.img[snap.etape]}/> : null }*/}
    <Txt_compo etape={snap.etape} /> {/* Appelle le composant Components avec la prop etape */}
    </div>

    </div>

    </motion.div>
    )
}


function Txt_compo({ etape }) { // Déstructure la prop etape pour obtenir sa valeur
  const E0 = () => <p><strong>Contexte :</strong> Les tissus biologiques, hautement diffusants, peuvent être rendus transparents par la méthode de clearing. On peut alors les rendre observables par microscopie optique. Un objectif idéal doit réunir un champ large, une grande ouverture ainsi qu’une longue frontale compatible avec différents milieux d’immersion d’indices différents, ce qui le rend coûteux et complexe. <br/><strong>Réalisation :</strong> En s’inspirant du télescope de Schmidt, nous avons pu retrouver la conception optique d’un article scientifique utilisant la fluorescence à deux photons. En partant de l’analyse des performances de l’objectif proposé, nous avons modélisé l’imagerie à deux photons en présence d’aberrations puis tolérancé la solution optique afin d’en proposer une conception mécanique. Par une solution de traitement d’images, il est ensuite possible de reconstituer l’échantillon biologique analysé.</p>;
  const E1 = () => <p>Le laser emmet des photons rouges/proche IR et le beam extender permet d'élargir le diamètre du faisceau laser.</p>;
  const E2 = () => <p>À l’aide du galvanomètre, on va pouvoir modifier l’angle d’incidence du faisceau laser et déplacer le lieu de focalisation sur l’échantillon afin d’en réaliser le scan volumique.</p>; 
  const E3 = () => <p>Les lentilles de scan constituent un système optique télécentrique permettant de : <br/> {"=> Maintenir un plan d'image plat, assurant une qualité d'image uniforme et sans distorsion."}<br/>{"=> Garantir une taille de spot minimale et constante, même lorsque l'angle du faisceau incident varie."}</p>;
  const E4 = () => <p>{"Combiné avec les lentilles de scan pour obtenir différents rapports de grossissement, ce système optique permet d'obtenir un front d'onde plan en sortie."}</p>;
  const E5 = () => <p>Dans la cuve, on retrouve l’objectif de Schmidt avec l’échantillon à imager. La cuve (ici retirée) est remplie de la solution de clearing qui rend transparent l’échantillon biologique.</p>; 
  const E6 = () => <p>La lame de Schmidt est le premier élément optique de l’objectif. Il s’agit d’une lame correctrice dont la première face est corrigée des aberrations sphériques induites par le miroir sphérique. La seconde face est asphérisée afin que le front d’onde du faisceau soit parallèle à la face en sortie de la lame, et donc non soumis à la réfraction.</p>; 
  const E7 = () => <p>Le miroir est le second élément de l’objectif. Il est sphérique et la lame est placée en son centre de courbure. Il va focaliser le faisceau incident en un point précis de l’échantillon pour permettre de l’imager. Le miroir peut se déplacer dans le plan X-Y, ce déplacement ayant été quantifié par le tolérancement de l’objectif.</p>; 
  const E8 = () => <p>Les marqueurs fluorecents présents dans l'echantillon permettent l'émission d’un photon de plus basse longueur d’onde que les photons incidents. L’échantillon biologique à analyser (ici l’embryon de poulet) est scanné en volume, point par point.<img src={"scan.png"}/> L’image sera reconstruite à partir de ces mesures.<img src={"capte.jpg"}/></p>; 
  const E9 = () => <p>Le miroir dichroïque permet de réflechir uniquement les photons de issus de la fluorescence vers le photomultiplicateur</p>;
  const E10 = () => <p>Le photomultiplicateur est essentiel pour imager l’échantillon. L’imagerie de fluorescence à deux photons n’émet que très peu de photons, on augmente donc le nombre de photons par ce dispositif. Notre étude photométrique a montré qu’on obtenait une centaine de photons par molécules imagées en sortie d’objectif. Grâce au photomultiplicateur (création de photoélectrons par des électrodes), on multiplie ce nombre par 10000. On a alors suffisamment de photons pour imager.</p>; 

  const dico = [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10]; // Tableau de composants

  return (
    <>
      {dico[etape]()} {/* Appelle le composant correspondant à l'indice etape */}
    </>
    );
}

export default App

