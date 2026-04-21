import NextImage, { type ImageProps } from 'next/image'
import { withBasePath } from '@/lib/with-base-path'

export default function Image(props: ImageProps) {
  const src = typeof props.src === 'string' ? withBasePath(props.src) : props.src
  return <NextImage {...props} src={src} />
}
