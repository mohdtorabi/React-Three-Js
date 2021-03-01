//react imports
import React from "react";
import { Switch, Route} from "react-router-dom";

// Routes and NavBar
import Home from "./components/Home";
import Portfolio from "./components/Portfolio.js";

const globalState = {
  text: "foo",
};

const globalStateContext = React.createContext(globalState);
export default function App(props) {
  return (
    <globalStateContext.Provider value={globalState}>
      <>
        <Switch>
          <Route exact path="/" render={(props) => <Home />} />
          <Route exact path="/Portfolio" render={(props) => <Portfolio />} />
        </Switch>
      </>
    </globalStateContext.Provider>
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