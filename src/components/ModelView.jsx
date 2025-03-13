import { Suspense }                                     from "react"
import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import Lights                                           from "./Lights"
import IPhone                                           from "./IPhone"
import * as THREE                                       from "three"

const ModelView = ({index, groupRef, gsapType, controlRef, setRotationState, item, size}) => {
  return (
    <View
      index    = {index}
      id       = {gsapType}
      className= {`w-full h-full ${index === 2} ? "right-[-100%]" : ""`}  
    >
      {/* lights up all the objects in the screen equally */}
      <ambientLight 
        intensity= {0.3} 
        />

      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 4]} 
        />

      <Lights />

      {/* allows to move the camera using the mouse */}
      <OrbitControls 
        makeDefault
        ref        = {controlRef}
        enableZoom = {false} //not zoom it in just move it around
        enablPan   = {false}
        rotateSpeed= {0.4} // slow and steady
        target     = {new THREE.Vector3(0, 0, 0)}//to target the center of the screen
        onEnd      = {() => setRotationState(controlRef.current.getAzimuthalAngle())}//get the angle of   the camera so we can know where we are 
        />

      <group 
        ref     = {groupRef} 
        name    = {`${index ===1} ? "small" : large`} 
        position= {[0, 0, 0]}
        >
        {/* provide some kind of loader until the model loads */}
        <Suspense 
          fallback= {<Html><div>Loading</div></Html>}
          >   
          <IPhone 
            scale= {index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item = {item}
            size = {size}
          />
        </Suspense>
      </group>

    </View>
  )
}

export default ModelView