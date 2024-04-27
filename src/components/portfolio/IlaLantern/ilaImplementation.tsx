import React, {useEffect} from "react";
import Image from 'next/image'
import {VideoMonitor} from "@/utils/VideoMonitor";
import {withBreakpoints} from "@/utils/withBreakpoints";

export const IlaImplementationWeb = React.memo(function IlaImplementation(props: any) {
  const [currentBrightness, setCurrentBrightness] = React.useState(1);
  const [duration, setDuration] = React.useState('duration-700');
  const tutorialVideo = React.useRef<HTMLVideoElement>(null);
  const controlVideo = React.useRef<HTMLVideoElement>(null);

  const updateBrightnessViaTutorial = React.useCallback((currentTime: number) => {
    if (currentTime < 5) { setCurrentBrightness(0) }
    if (currentTime > 5.8 && currentTime < 6) { setCurrentBrightness(99) }
    if (currentTime > 9.84 && currentTime < 10.77) { setCurrentBrightness(5) }
    if (currentTime > 12.36 && currentTime < 13.76) { setCurrentBrightness(90) }
  }, [setCurrentBrightness])

  const updateBrightnessViaControl = React.useCallback((currentTime: number) => {
    if (currentTime < 2) {
      setCurrentBrightness(99)
      setDuration('duration-1500')
    }
    if (currentTime > 2.33 && currentTime < 3.83) {
      setCurrentBrightness(40)
    }
    if (currentTime > 4 && currentTime < 5) {
      setDuration('duration-500')
    }
    if (currentTime > 5.2 && currentTime < 6.69) {
      setCurrentBrightness(99)
    }
    if (currentTime > 8.5 && currentTime < 9.3) {
      setCurrentBrightness(0)
    }
    if (currentTime > 10.9 && currentTime < 12) {
      setCurrentBrightness(99)
    }
  }, [setCurrentBrightness])

  useEffect(() => {
    if (tutorialVideo.current && controlVideo.current) {
      const tutorialMonitor = new VideoMonitor(tutorialVideo.current);
      tutorialMonitor.on(updateBrightnessViaTutorial);
      tutorialMonitor.start();

      const controlMonitor = new VideoMonitor(controlVideo.current);
      controlMonitor.on(updateBrightnessViaControl);
      controlMonitor.start();
      return () => {
        tutorialMonitor.stop();
        controlMonitor.stop();
      }
    }
  }, [tutorialVideo]);

  return (
    <div className={`flex flex-col h-full w-full p-7 ${props.active ? 'opacity-100' : 'opacity-50'} ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="min-h-lvh md:min-h-min md:h-1/2 flex-1 w-full relative">
        <Image
          alt="Ila Lantern in the midst of various parts in the old workshop space"
          src="/ila-lantern/workshop.webp"
          fill
          className={`h-full object-cover object-center ease-linear transition-all ${duration}`} style={{ filter: `brightness(0.${currentBrightness})`}}
        />
      </div>
      <div className="h-1/2 flex-1 flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-1/2">
          <video controls className="object-contain h-3/4" ref={tutorialVideo}>
            <source src="/ila-lantern/tutorial.mp4" />
          </video>
          <h1 className="py-3 text-white text-xl">First Use Tutorial</h1>
          <p className="text-white">{"We found that early customers had issues changing the brightness. The purpose of this tutorial is to teach customers how to use Ila Lantern's touch button in an engaging and interactive way. The React Native app subscribes to changes to the device's state via Bluetooth Low Energy characteristic notifications."}</p>
        </div>
        <div className="flex flex-col w-full md:w-1/2">
          <video controls className="object-contain h-3/4" ref={controlVideo}>
            <source src="/ila-lantern/control.mp4" />
          </video>
          <h1 className="py-3 text-white text-xl">Lantern Control Page</h1>
          <p className="text-white">{"This page allows customers to change their lantern's brightness by moving the control or by scrolling the number readout. The UI reflects the power state of the light and changes in real-time when the physical product changes its power state or brightness."}</p>
        </div>
      </div>
    </div>
  );
});

export const IlaImplementationMobile = React.memo(function IlaImplementation(props: any) {
  return (
    <div className={`flex flex-col h-full w-full p-3 opacity-100 ${props.active ? 'blur-0' : 'blur-sm'} transition-all duration-700`}>
      <div className="min-h-lvh flex-1 w-full relative">
        <Image
          alt="Ila Lantern in the midst of various parts in the old workshop space"
          src="/ila-lantern/workshop.webp"
          fill
          className={`h-full object-cover object-center`}
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="h-lvh flex flex-col w-full">
          <video controls className="object-contain h-3/4">
            <source src="/ila-lantern/tutorial.mp4" />
          </video>
          <h1 className="py-3 text-white text-xl">First Use Tutorial</h1>
          <p className="text-white">{"We found that early customers had issues changing the brightness. The purpose of this tutorial is to teach customers how to use Ila Lantern's touch button in an engaging and interactive way. The React Native app subscribes to changes to the device's state via Bluetooth Low Energy characteristic notifications."}</p>
        </div>
        <div className="h-lvh flex flex-col w-full">
          <video controls className="object-contain h-3/4">
            <source src="/ila-lantern/control.mp4" />
          </video>
          <h1 className="py-3 text-white text-xl">Lantern Control Page</h1>
          <p className="text-white">{"This page allows customers to change their lantern's brightness by moving the control or by scrolling the number readout. The UI reflects the power state of the light and changes in real-time when the physical product changes its power state or brightness."}</p>
        </div>
      </div>
    </div>
  );
});

export const IlaImplementation = withBreakpoints({
  md: IlaImplementationMobile,
  default: IlaImplementationWeb,
})
