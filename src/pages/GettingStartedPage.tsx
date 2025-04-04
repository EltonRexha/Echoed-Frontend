import CycleComponents from '@/components/ui/CycleComponents';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { Link } from 'react-router-dom';
import Line from '@/components/ui/LineAnimation';
import { AnimatePresence, Variants } from 'framer-motion';
import postDark from '@/assets/images/layout/postDark.svg';
import postLight from '@/assets/images/layout/postLight.svg';
import trendingDark from '@/assets/images/layout/trendingDark.svg';
import trendingLight from '@/assets/images/layout/trendingLight.svg';
import '@/assets/images/backgrounds/desktop-mountain-layer.svg';
import { motion } from 'framer-motion';
import useAutoCycle from '@/hooks/useAutoCycle';
import ViewMore from '@/components/ui/ViewMore';
import messageDark from '@/assets/images/layout/messageDark.svg';
import messageLight from '@/assets/images/layout/messageLight.svg';
import StepIndicator from '@/components/ui/StepIndicator';
import FadeInView from '@/components/FadeinView';
import FadeInList from '@/components/FadeInList';

const postExampleVariant: Variants = {
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

const POST_EXAMPLE_LAYOUT_CHANGE_DELAY = 12000;

function GettingStartedPage(): JSX.Element {
  //This will switch from 0 to 1 in some delay
  //It is used to tell which of the post example layout it is currently displaying
  const postExampleCurrentIndex = useAutoCycle(
    [0, 1],
    POST_EXAMPLE_LAYOUT_CHANGE_DELAY
  );

  return (
    <div className="overflow-x-hidden font-raleway">
      <div className="min-h-[100vh] bg-mountain pl-2 pr-2 sm:pl-10 sm:pr-10 relative">
        <FadeInView>
          <GettingStartedNav />
        </FadeInView>
        <div className="p-5 h-16 sm:h-32 text-center text-light-primary dark:text-dark-primary mt-32">
          <CycleComponents delay={9000}>
            <div key={'Welcome to echoed'}>
              <FadeInView>
                <h1 className="sm:text-4xl text-2xl md:text-5xl text-dark-secondary font-semiBold w-max mx-auto sm:mt-7">
                  Welcome to Echoed
                </h1>
              </FadeInView>
            </div>
            <div key={'Open source'}>
              <FadeInView>
                <h1 className="sm:text-4xl text-2xl md:text-5xl text-dark-secondary font-semiBold w-[100%] sm:w-md mx-auto">
                  Open source, social media website
                </h1>
              </FadeInView>
            </div>
          </CycleComponents>
        </div>

        <div className="block">
          <FadeInList>
            <p className="text-md mt-10 sm:mt-5 text-center text-light-secondary dark:text-dark-secondary-darker max-w-md mx-auto font-mono ">
              A Place To Share Your Ideas, Make Friends,{' '}
              <span className="text-purple-500">And Go Open.</span>
            </p>
            <div className="mt-10 text-purple-shade-300 dark:text-purple-300 text-2xl mx-auto sm:text-3xl font-mono w-max">
              <Line color="#560090" height={2}>
                <Link to="/sign-up">
                  <p>Get started</p>
                </Link>
              </Line>
            </div>
          </FadeInList>
        </div>

        <FadeInView>
          <div className="font-mono">
            <div className="absolute left-0 right-0 bottom-0 text-purple-300 dark:text-dark-primary text-2xl mb-30">
              <div className="m-auto w-max">
                <ViewMore to="#post-example" />
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
      <div className="relative min-h-[100vh] bg-blob py-10">
        <div
          className="w-full min-h-[100vh] flex flex-col justify-center"
          id="post-example"
        >
          <div className="pb-4 pt-5 w-max m-auto flex gap-2 items-center h-max">
            <StepIndicator
              currentIndex={postExampleCurrentIndex}
              // This is the layout amount which is 2 in this case one for the posts and one for the trending
              stepsAmount={2}
            />
          </div>
          <div className="overflow-hidden grid gap-2 lg:grid-cols-2 justify-items-center items-center min-h-[80vh] p-2 sm:p-20 sm:pt-5 py-10">
            <div className="self-center">
              <CycleComponents delay={POST_EXAMPLE_LAYOUT_CHANGE_DELAY}>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={1}
                    variants={postExampleVariant}
                    exit="exit"
                    animate="animate"
                    initial="initial"
                    className="shadow-2xl"
                  >
                    <img
                      src={postDark}
                      alt="Post"
                      className="hidden dark:block"
                    />
                    <img
                      src={postLight}
                      alt="Post"
                      className="block dark:hidden"
                    />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={2}
                    variants={postExampleVariant}
                    exit="exit"
                    animate="animate"
                    initial="initial"
                    className="shadow-2xl"
                  >
                    <img
                      src={trendingDark}
                      alt="Trending"
                      className="hidden dark:block"
                    />
                    <img
                      src={trendingLight}
                      alt="Trending"
                      className="block dark:hidden"
                    />
                  </motion.div>
                </AnimatePresence>
              </CycleComponents>
            </div>
            <div>
              <CycleComponents delay={POST_EXAMPLE_LAYOUT_CHANGE_DELAY}>
                <AnimatePresence mode="popLayout">
                  <div
                    className="text-light-secondary dark:text-dark-secondary bg-[color:rgba(255,255,255,0.2)] dark:bg-[color:rgba(255,255,255,0.1)] rounded shadow-2xl p-4 backdrop-blur-2xl"
                    key={'create posts'}
                  >
                    <FadeInList>
                      <h2 className="text-light-primary dark:text-dark-primary text-3xl mb-10 font-semibold">
                        Create Posts
                      </h2>
                      <p className="mb-10">
                        Echoed allows you to create posts and share your
                        thoughts with the world. You can write text, share
                        images, videos, and more to express yourself. Simply
                        click the "Post" button after composing your message. To
                        make your posts more engaging, you can easily upload
                        images or videos alongside your text.
                      </p>
                      <ul className="flex flex-col gap-2 mb-10">
                        <li>
                          <span className="font-bold">Text</span> Share your
                          thoughts with just text.
                        </li>
                        <li>
                          <span className="font-bold">Images</span> Add images
                          by clicking the image icon to select a file from your
                          device.
                        </li>
                        <li>
                          <span className="font-bold">Videos</span> Upload
                          videos to make your posts more dynamic.
                        </li>
                        <li>
                          <span className="font-bold">Emojis</span> Use emojis
                          to express your emotions and make your posts fun!
                        </li>
                      </ul>
                      <p className="mb-5">
                        Once you're ready, simply hit "Post" and your content
                        will be shared with your followers.
                      </p>
                    </FadeInList>
                  </div>
                </AnimatePresence>
                <AnimatePresence mode="popLayout">
                  <div
                    className="text-light-secondary dark:text-dark-secondary bg-[color:rgba(255,255,255,0.2)] dark:bg-[color:rgba(255,255,255,0.1)] rounded shadow-2xl p-4 backdrop-blur-2xl"
                    key={'trending topics'}
                  >
                    <FadeInList>
                      <div className="mb-3">
                        <h2 className="text-light-primary dark:text-dark-primary text-3xl mb-2 font-semibold">
                          Trending Topics & Hashtags
                        </h2>
                        <p>
                          Stay updated with the latest conversations through
                          trending topics and hashtags on Echoed. The trending
                          section highlights popular discussions, events, and
                          viral moments happening in real-time.
                        </p>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-light-primary dark:text-dark-primary text-2xl mb-2">
                          How Trending Works
                        </h3>
                        <p>
                          Trending topics are determined by a combination of
                          factors, including the number of posts, engagement
                          levels, and sudden spikes in activity. The trending
                          list updates dynamically to reflect what people are
                          talking about the most.
                        </p>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-light-primary dark:text-dark-primary text-2xl mb-2">
                          Using Hashtags
                        </h3>
                        <ul className="flex flex-col gap-2">
                          <li>
                            <span className="font-bold">Create a Hashtag</span>{' '}
                            Simply type <code>#</code> followed by a word or
                            phrase (without spaces) to create a hashtag.
                          </li>
                          <li>
                            <span className="font-bold">Discover Topics:</span>{' '}
                            Click on a hashtag to explore posts related to that
                            topic.
                          </li>
                          <li>
                            <span className="font-bold">
                              Join Conversations:
                            </span>{' '}
                            Use relevant hashtags in your posts to increase
                            visibility and engage with a wider audience.
                          </li>
                        </ul>
                      </div>

                      <div className="mb-3">
                        <h3 className="text-light-primary dark:text-dark-primary text-2xl mb-2">
                          Personalized Trends
                        </h3>
                        <p>
                          Echoed offers personalized trending topics based on
                          your location, interests, and engagement. You can also
                          explore global trends to see what’s happening
                          worldwide.
                        </p>

                        <p>
                          Engage with trending topics to stay in the loop and be
                          part of the conversation!
                        </p>
                      </div>
                    </FadeInList>
                  </div>
                </AnimatePresence>
              </CycleComponents>
            </div>
          </div>
        </div>
      </div>
      <div
        id="message-example"
        className="w-full min-h-[100vh] bg-light dark:bg-purple-shade-300 hidden sm:flex"
      >
        <FadeInView>
          <div className="bg-layer min-h-[100vh] w-[100vw] flex flex-col justify-center">
            <div className="grid md:grid-cols-2 gap-4 p-2 md:p-10 lg:p-20 items-center justify-items-center">
              <div>
                <div className="hidden dark:block">
                  <img src={messageDark} alt="" />
                </div>
                <div className="block dark:hidden">
                  <img src={messageLight} alt="" />
                </div>
              </div>
              <div className="text-light-secondary dark:text-dark-secondary bg-[color:rgba(255,255,255,0.2)] dark:bg-[color:rgba(255,255,255,0.1)] rounded shadow-2xl p-4 backdrop-blur-2xl">
                <div className="mb-3">
                  <FadeInList>
                    <h2 className="text-light-primary dark:text-dark-primary text-3xl mb-2 font-semibold">
                      Message people
                    </h2>
                    <p>
                      Connect and communicate with others effortlessly on
                      Echoed. Our messaging feature allows you to stay in touch
                      with friends, family, or colleagues directly within the
                      app.
                    </p>
                  </FadeInList>
                </div>

                <div className="mb-3">
                  <FadeInList>
                    <h3 className="text-light-primary dark:text-dark-primary text-2xl mb-2">
                      How Messaging Works
                    </h3>
                    <p>
                      You can share text, images, and more, with the option to
                      send messages privately or in group chats. Conversations
                      are easy to keep track of, and you’ll never miss an
                      important message.
                    </p>
                  </FadeInList>
                </div>

                <div className="mb-3">
                  <FadeInList>
                    <h3 className="text-light-primary dark:text-dark-primary text-2xl mb-2">
                      Sending Media in Messages
                    </h3>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <span className="font-bold">
                          Send Photos and Videos:
                        </span>{' '}
                        Attach media files to your messages to make your
                        conversations more engaging.
                      </li>
                      <li>
                        <span className="font-bold">Group Conversations:</span>{' '}
                        Create a group chat to communicate with multiple people
                        at once, perfect for planning events or staying in touch
                        with teams.
                      </li>
                      <li>
                        <span className="font-bold">
                          Instant Notifications:
                        </span>{' '}
                        Receive instant notifications whenever someone sends you
                        a message, ensuring you never miss out on important
                        updates.
                      </li>
                    </ul>
                  </FadeInList>
                </div>
              </div>
            </div>
          </div>
        </FadeInView>
      </div>
    </div>
  );
}

export default GettingStartedPage;
