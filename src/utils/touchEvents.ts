interface TouchEventListener {
  (event: TouchEvent): void;
}

interface SingleTouchpointListener {
  (touch: Touch): void;
}

export const whileZoomedOut = (callback: TouchEventListener): TouchEventListener => {
  return (event: TouchEvent): void => {
    const zoomLevel = document.documentElement.clientWidth / window.innerWidth;
    if (zoomLevel === 1) {
      callback(event);
    }
  };
};

export const onSingleTouchPoint = (callback: SingleTouchpointListener, onMany: () => void): TouchEventListener => {
  return (event: TouchEvent): void => {
    if (event.touches.length === 1) {
      callback(event.touches[0]);
    }
    if (event.touches.length >= 2) {
      onMany();
    }
  };
};
