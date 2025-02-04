import SlideAnimation from '@/components/SlideAnimation';
import TypeAnimationWrapper from '@/components/TypeAnimationWrapper';
import CycleComponents from '@/components/ui/CycleComponents';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { Link } from 'react-router-dom';
import Line from '@/components/ui/LineAnimation';
import ViewMore from '@/components/ui/viewMore';
import { useRef } from 'react';
import {
  AnimatePresence,
  easeInOut,
  MotionConfig,
  useInView,
} from 'framer-motion';
import postDark from '@/assets/images/layout/postDark.svg';
import postLight from '@/assets/images/layout/postLight.svg';
import trendingDark from '@/assets/images/layout/trendingDark.svg';
import trendingLight from '@/assets/images/layout/trendingLight.svg';
import { motion } from 'framer-motion';

const layoutVariant = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animate: {
    scale: [1.3, 1],
    opacity: 1,
    transition: {
      ease: 'easeIn',
      delay: 1,
      duration: 1,
      type: 'spring',
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 1,
      type: 'spring',
    },
  },
};

function GettingStartedPage(): JSX.Element {
  const examplesPart = useRef(null);
  const examplesPartInView = useInView(examplesPart, { once: true });

  return (
    <div className="overflow-x-hidden">
      <div className="min-h-[101vh] bg-mountain pl-2 pr-2 sm:pl-10 relative">
        <SlideAnimation duration={0.5} delay={0} bgColor="#7700c6" />
        <SlideAnimation duration={0.5} delay={0.1} bgColor="#560090" />
        <GettingStartedNav />
        <div className="p-5 mt-5 h-36 bg-slate-600 border-slate-500 border-2 w-[100%] sm:w-[450px] md:w-[550px] text-gray-100">
          <TypeAnimationWrapper duration={6} backgroundClr="#475569">
            <CycleComponents delay={6000}>
              <h1 className="sm:text-4xl text-2xl md:text-5xl  font-raleway text-gray-300 font-semiBold">
                Welcome to Echoed
              </h1>
              <h1 className="sm:text-4xl text-2xl md:text-5xl font-raleway text-gray-300 font-semiBold">
                Open source
              </h1>
            </CycleComponents>
          </TypeAnimationWrapper>
          <TypeAnimationWrapper duration={6} backgroundClr="#475569">
            <CycleComponents delay={6000}>
              <h1 className="sm:text-4xl text-2xl md:text-5xl font-raleway text-gray-300 font-semiBold">
                {' '}
              </h1>
              <h1 className="sm:text-4xl text-2xl md:text-5xl font-raleway text-gray-300 font-semiBold">
                Social Media website
              </h1>
            </CycleComponents>
          </TypeAnimationWrapper>
        </div>
        <div>
          <p className="text-md mt-10 ml-2 sm:ml-0 text-gray-400 font-mono">
            A Place To Share Your Ideas, Create Firends,{' '}
            <span className="text-purple-500">And Go Open.</span>
          </p>
        </div>
        <div className="mt-10 text-purple-300 text-2xl ml-2 sm:ml-0 sm:mr-0 sm:text-3xl font-mono w-max">
          <Line color="#560090" height={2}>
            <Link to="/sign-up">
              <p>Get started</p>
            </Link>
          </Line>
        </div>
        <ViewMore to="#example" />
      </div>
      <div
        className="relative min-h-[100vh] bg-dark-blob"
        id="example"
        ref={examplesPart}
      >
        {examplesPartInView && (
          <>
            <SlideAnimation
              duration={0.5}
              delay={0}
              bgColor="#7700c6"
              startX={100}
              endX={-100}
            />
            <SlideAnimation
              duration={0.5}
              delay={0.2}
              bgColor="#560090"
              startX={100}
              endX={-100}
            />
          </>
        )}
        <div className="w-full h-[100vh] p-20 grid grid-cols-2 justify-items-center">
          <div className="self-center">
            <CycleComponents delay={12000}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={1}
                  variants={layoutVariant}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                  className="shadow-2xl"
                >
                  <img src={postDark} alt="Post" />
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={2}
                  variants={layoutVariant}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                  className="shadow-2xl"
                >
                  <img src={trendingDark} alt="Trending" />
                </motion.div>
              </AnimatePresence>
            </CycleComponents>
          </div>
          <div>
            <CycleComponents delay={12000}>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={2}
                  variants={layoutVariant}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                >
                  <div className="text-gray-300 text-sm bg-[color:rgba(255,255,255,0.1)] rounded shadow-2xl p-4  backdrop-blur-2xl">
                    <h2 className="text-gray-100 text-3xl mb-10">
                      Create Posts
                    </h2>
                    <p className="mb-10">
                      Echoed allows you to create posts and share your thoughts
                      with the world. You can write text, share images, videos,
                      and more to express yourself. Simply click the "Post"
                      button after composing your message. To make your posts
                      more engaging, you can easily upload images or videos
                      alongside your text.
                    </p>
                    <ul className="flex flex-col gap-2 mb-10">
                      <li>
                        <span className="font-bold">Text</span> Share your
                        thoughts with just text.
                      </li>
                      <li>
                        <span className="font-bold">Images</span> Add images by
                        clicking the image icon to select a file from your
                        device.
                      </li>
                      <li>
                        <span className="font-bold">Videos</span> Upload videos
                        to make your posts more dynamic.
                      </li>
                      <li>
                        <span className="font-bold">Emojis</span> Use emojis to
                        express your emotions and make your posts fun!
                      </li>
                    </ul>
                    <p className="mb-5">
                      Once you're ready, simply hit "Post" and your content will
                      be shared with your followers.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={3}
                  variants={layoutVariant}
                  exit="exit"
                  animate="animate"
                  initial="initial"
                >
                  <div className="text-gray-300 text-sm bg-[color:rgba(255,255,255,0.1)] rounded shadow-2xl p-4 backdrop-blur-2xl">
                    <div className="mb-3">
                      <h2 className="text-gray-100 text-3xl mb-2">
                        Trending Topics & Hashtags
                      </h2>
                      <p>
                        Stay updated with the latest conversations through
                        trending topics and hashtags on Echoed. The trending
                        section highlights popular discussions, events, and
                        viral moments happening in real-time.
                      </p>
                    </div>

                    <h3 className="text-gray-100 text-2xl mb-2">
                      How Trending Works
                    </h3>
                    <p>
                      Trending topics are determined by a combination of
                      factors, including the number of posts, engagement levels,
                      and sudden spikes in activity. The trending list updates
                      dynamically to reflect what people are talking about the
                      most.
                    </p>

                    <h3 className="text-gray-100 text-2xl mb-2">
                      Using Hashtags
                    </h3>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <span className="font-bold">Create a Hashtag</span>{' '}
                        Simply type <code>#</code> followed by a word or phrase
                        (without spaces) to create a hashtag.
                      </li>
                      <li>
                        <span className="font-bold">Discover Topics:</span>{' '}
                        Click on a hashtag to explore posts related to that
                        topic.
                      </li>
                      <li>
                        <span className="font-bold">Join Conversations:</span>{' '}
                        Use relevant hashtags in your posts to increase
                        visibility and engage with a wider audience.
                      </li>
                    </ul>

                    <h3 className="text-gray-100 text-2xl mb-2">
                      Personalized Trends
                    </h3>
                    <p>
                      Echoed offers personalized trending topics based on your
                      location, interests, and engagement. You can also explore
                      global trends to see what’s happening worldwide.
                    </p>

                    <p>
                      Engage with trending topics to stay in the loop and be
                      part of the conversation!
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CycleComponents>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GettingStartedPage;
