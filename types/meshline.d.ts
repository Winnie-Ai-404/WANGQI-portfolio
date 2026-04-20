declare module 'meshline' {
  export const MeshLineGeometry: unknown
  export const MeshLineMaterial: unknown
}

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any
      meshLineMaterial: any
    }
  }
}
