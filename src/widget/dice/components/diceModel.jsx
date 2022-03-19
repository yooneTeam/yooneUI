import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import * as THREE from "three";
import { useDiceRoll } from "../globalState/states";
import url from "../model/dice.gltf";

export default function DiceBox({ stateIndex }) {
  // model from https://www.turbosquid.com/3d-models/3d-6-edged-dice-1301812#
  const { nodes } = useGLTF(url);
  const { viewport } = useThree();
  const [roll, setRoll] = useRecoilState(useDiceRoll(stateIndex));

  const [ref, api] = useBox(() => ({
    mass: 10,
    position: [0, 0, 0],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    args: [2, 2, 2],
    friction: 0,
  }));
  const mat = useRef();
  const mat2 = useRef();

  useEffect(() => {
    if (roll) {
      api.position.set(0, 0, 0);
      setRoll(false);
    }
  }, [roll, setRoll]);

  useEffect(() => {
    mat.current.color = new THREE.Color("white");
    mat2.current.color = new THREE.Color("black");
  }, []);

  return (
    <group ref={ref} dispose={null}>
      <mesh geometry={nodes.Cube001_2.geometry}>
        <meshStandardMaterial ref={mat2} attach='material' />
      </mesh>
      <mesh geometry={nodes.Cube001_1.geometry}>
        <meshStandardMaterial ref={mat} attach='material' />
      </mesh>
    </group>
  );
}

useGLTF.preload(url);
