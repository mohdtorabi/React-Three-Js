import React, { useRef, useEffect, useState, Suspense } from "react";
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import "./App.scss";
//Components
import Header from "./components/header";
import { Section } from "./components/section";

// Page State
import state from "./components/state";

// R3F
import { Canvas, useFrame, useThree } from "react-three-fiber";
import { Html, useProgress, useGLTFLoader } from "drei";

// React Spring
import { a, useTransition } from "@react-spring/web";
//Intersection Observer
import { useInView } from "react-intersection-observer";

function Model({ modelPath }) {
  const gltf = useGLTFLoader('scene.gltf', true);
  return <primitive object={gltf.scene} dispose={null} />;
}


// const Camera = () => {
//   const camera = useRef()
//   const { aspect, size, setDefaultCamera } = useThree()
//   const pixelToThreeUnitRatio = 1
//   const planeDistance = 0
//   const cameraDistance = 250
//   const distance = cameraDistance - planeDistance
//   const height = size.height / pixelToThreeUnitRatio
//   const halfFovRadians = Math.atan((height / 2) / distance)
//   const fov = 2 * halfFovRadians * (180/Math.PI)
//   useEffect(() => void setDefaultCamera(camera.current), [])
//   return <perspectiveCamera
//     ref={camera}
//     aspect={aspect}
//     fov={fov}
//     position={[0, 0, cameraDistance]}
//     onUpdate={self => self.updateProjectionMatrix()}
//   />
// }
// const Lights = () => {
//   return (
//     <>
//       {/* Ambient Light illuminates lights for all objects */}
//       <ambientLight intensity={0.3} />
//       {/* Diretion light */}
//       <directionalLight position={[10, 10, 5]} intensity={1} />
//       <directionalLight
//         castShadow
//         position={[0, 10, 0]}
//         intensity={1.5}
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//         shadow-camera-far={50}
//         shadow-camera-left={-10}
//         shadow-camera-right={10}
//         shadow-camera-top={10}
//         shadow-camera-bottom={-10}
//       />
//       {/* Spotlight Large overhead light */}
//       <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
//     </>
//   );
// };

// const HTMLContent = ({
//   children,
//   modelPath,
//   positionY,
//   domContent
// }) => {
//   const ref = useRef()
//   // useFrame(() => (
//   //   ref.current.rotation.y -= 0.01
//   // ))
//   return (
//     // <Section factor={1.5} offset={1}>
//     //   <group position={[0, position, 0]}>
//     //     <mesh ref={ref} position={[0, -35, 0]}>
//     //       <Model url={modelPath} />
//     //     </mesh>
//     //     <Html fullscreen portal={domContent}>
//     //       <div ref={refItem} className='container'>
//     //         <h1 className='title'>{children}</h1>
//     //       </div>
//     //     </Html>
//     //   </group>
//     // </Section>
//     <Section factor={1.5} offset={1}>
//       <group position={[0, positionY, 0]}>
//       <mesh onPointerMove={(e) => console.log("helllo")} ref={ref} position={[0, -35, 0]}>
//         <Model modelPath={modelPath}/>
//         </mesh>
//         <Html portal={domContent} fullscreen>
//           {children}
//         </Html>
//       </group>
//     </Section>
//   );
// };
function handleWheel(e) {
  console.log(e.camera);
  e.camera.visible = false
}
function Asset({ url }) {
  const gltf = useLoader(GLTFLoader, url)
  return <primitive object={gltf.scene} />
}

function Box(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onWheel={handleWheel}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <sphereBufferGeometry attach="geometry" args={[1, 16, 16]}/>
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'}/>
      
    </mesh>
  );
  
}
function movement(e) {
console.log(e);
    // case 38:
    // cube.rotation.z -= 0.1;
    // break;
    // case 39:
    // cube.rotation.x -= 0.1;
    // break;
    // case 40:
    // cube.rotation.z += 0.1;
    // break;
  // }
};

function Box2(props) {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame(() => (mesh.current.rotation.x += 0.01))
  
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => {
        setActive(!active) 
        console.log(movement(e))
      }}
      onPointerOver={(e) => setHover(true)}
      onWheel={handleWheel}
      onPointerOut={(e) => setHover(false)}
    >
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'}/> */}
      <Suspense fallback>
        <Asset url="/scene.gltf" />
      </Suspense>
    </mesh>
  );
  
}
function Rig({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    // camera.position.x += (mouse.current[1] / 50 - camera.position.x) * 0.05
    // camera.position.y += (-mouse.current[1] / 50 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function App() {
  // const domContent = useRef()
  const mouse = useRef([0, 0])
  // const scrollArea = useRef();
  // const onScroll = (e) => (state.top.current)

  return (
    <Canvas colorManagement camera={{ position: [80, 100, 0],  fov: 25 }} onPointerMove={(e) => (mouse.current = [e.clientX - window.innerWidth / 2, e.clientY - window.innerHeight / 2])}>
      <ambientLight position={[0, 100, 0]}/>
      <pointLight position={[0, 0, 0]} />
      <Box position={[-1.2, 0, 0]}/>
      <Box2 position={[1.2, 0, 0]} />
      <Rig mouse={mouse} />
    </Canvas>
  );
}

{/* <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        Lights Component
        <Camera />
        <Lights/>
        <Suspense fallback={null}>
          <HTMLContent 
            modelPath='/scene.gltf'
            positionY={250}
            domContent={domContent}
          >
            <div className="container">
              <h1 className="title">Hello</h1>
            </div>
          </HTMLContent>
        </Suspense>
        
      </Canvas>
      
      <div className="scrollArea">
          <div style={{position: 'sticky', top:0}} ref={domContent}></div>
          <div style={{height: `${state.pages * 100}vh`}}></div>
      </div> */}