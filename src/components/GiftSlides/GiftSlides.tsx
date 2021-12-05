import React from 'react'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { photos } from './photos'

const GiftSlides: React.FC = () => {

  const [currentImage, setCurrentImage] = React.useState<number>(0)
  const [viewerIsOpen, setViewerIsOpen] = React.useState<boolean>(false)

  const openLightbox = React.useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, [])
  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <div className="GiftSlides">
      <Gallery photos={photos} onClick={openLightbox}/>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={ photos.map( x => ({
                ...x,
                source: x.src,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  )
}

export default React.memo(GiftSlides)
