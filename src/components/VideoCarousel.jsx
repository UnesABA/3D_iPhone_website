import { useRef, useState, useEffect }  from 'react'
import { hightlightsSlides }            from '../constants'
import { pauseImg, playImg, replayImg } from '../utils'
import { useGSAP }                      from '@gsap/react'
import gsap                             from "gsap"
import { ScrollTrigger }                from "gsap/all"
gsap.registerPlugin(ScrollTrigger)


const VideoCarousel = () => {
  const videoRef     = useRef([])
  const videoSpanRef = useRef([])
  const videoDivRef  = useRef([])

  const [video, setVideo] = useState({
    isEnd      : false,
    startPlay  : false,
    videoId    : 0,
    isLastVideo: false,
    isPlaying  : false
  })

  const {isEnd, startPlay, videoId, isLastVideo, isPlaying} = video
  const [loadedData, setLoadedData] = useState([]) 

  useGSAP(() =>{
    gsap.to("#video",{
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none"
      },
      onComplete: () =>{
        setVideo((pre) =>({
          ...pre,
          startPlay: true,
          isPlaying: true
        }))
      }
    })
  }, [isEnd, videoId])

  
  useEffect(() =>{
    if(loadedData.length > 3){
      if(!isPlaying){
        videoRef.current[videoId].pause()
      } else{
        startPlay && videoRef.current[videoId].play()
      }
    }
  }, [isPlaying, videoId, startPlay, loadedData])
  
  useEffect(() =>{
    let currentProgress = 0
    let span = videoSpanRef.current
    
    if(span[videoId]){
      let anim = gsap.to(span[videoId], {
        onUpdate: () =>{
           // get the progress of the video
          const progress = math.ceil(anim.progress() * 100)
          if(progress != currentProgress){
            currentProgress = progress
            
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? "10vw" // mobile 
                                             : window.innerWidth < 1200 ? "10vw" // tablet
                                                                        : "4vw" // laptop
            })

            gsap.to(span[videoId],{
              width: `${currentProgress} %`,
              background: white
            })
          }
        }
      })
    }
  },[videoId, startPlay])
  
  const handleProcess = (type, i) =>{
    switch (type) {
      case "video-end":
        setVideo((pre) =>({
          ...pre,
          isEnd: true,
          videoId: i + 1
        }))
        break;
        
      case "video-last":
        setVideo((pre) =>({
          ...pre,
          isLastVideo: true
        }))
        break;
        
      case "video-reset":
        setVideo((pre) =>({
          ...pre,
          isLastVideo: false,
          videoId: 0
        }))
        break;
        
      case "play":
        setVideo((pre) => ({ 
          ...pre, 
          isPlaying: !pre.isPlaying 
        }))
      break;
      
      case "pause":
        setVideo((pre) => ({ 
          ...pre, 
          isPlaying: !pre.isPlaying 
        }))
        break;
        
        
        
      default:
          return video
          }
          }
              
    const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e])

    return (
                <>
      <div className= "flex items-center">  
        {hightlightsSlides.map((list, i) =>(
          <div key={list.id} id= "slider" className= "sm:pr-20 pr-10">
            <div className= "video-carousel_container">
              <div className= "w-full h-full flex-center rounded-3xl overflow-hiddenl bg-black">
                <video
                  id= "video"
                  playsInline={true}
                  preload= "auto"
                  muted
                  ref= {(el) => (videoRef.current[i] = el)}
                  onPlay= {() =>{
                    setVideo((pre) =>({
                      ...pre,
                      isPlaying: true
                    }))
                  }}
                  onLoadedMetadata= {(e) => handleLoadedMetadata(i, e)}
                >
                  <source src= {list.video} type= "video/mp4"/>
                </video>
              </div>
              <div className= "absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) =>(
                  <p key= {text} className= "md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
              ref={(el) => (videoDivRef.current[i] = el)}
            >
              <span 
                className= "absolute h-full w-full rounded-full"
                ref= {(el) => (videoSpanRef.current[i] = el)}
                />
            </span>
          ))}
        </div>
        <button className= "control-btn">
          <img 
          src= {isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg} 
          alt= {isLastVideo ? "replay"  : !isPlaying ? "play"  : "pause"}  
          onClick= {isLastVideo ? () => handleProcess("video-reset") 
                                : !isPlaying ? () => handleProcess("play")
                                             : () => handleProcess("pause")} 
          />
        </button>
      </div>

    </>
  )
}

export default VideoCarousel