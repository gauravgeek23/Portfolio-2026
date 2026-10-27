// Camera App Wear OS case study (Figma: Portfolio Fall 2024, "About page" 200:292).
// Same block layout as Academic Calendar and LottieFiles for Vision Pro (see
// components/CaseStudyBlocks.jsx); the hero is the project's cover video.
export const cameraWearOsCaseStudy = {
  heading: 'Camera App Wear OS | Google Watch (Personal Project) | Oct 2023',
  blocks: [
    { type: 'hero' },
    {
      type: 'text',
      title: 'Overview',
      body: [
        'During my 3rd year of college, a graduated senior who was employed at Google reached out to our design group unexpectedly. He suggested organizing a designathon where we would all tackle the same problem statement. Intrigued by the idea, we agreed to participate. The format required each designer to develop a project based on the given statement, after which we would critique each other’s work. We thought it sounded like a great opportunity, so we decided to give it a try.',
      ],
    },
    {
      type: 'text',
      title: 'Problem Statement',
      body: [
        "Camera app for Android watch. Works as a remote for your phone's camera. Imagine you put your phone on a tripod and want to click pictures or record videos. How would you expect the app to look and work?",
        {
          list: [
            [
              { text: 'Functionalities -', strong: true },
              ' click pictures, set timer, record videos, switch between primary lens and wide angle lens.',
            ],
            [
              { text: 'Deliverables - ', strong: true },
              'minimum 3 screens. Dimensions 360pixels x 360pixels. Remember smallest tap target size is 44pixels x 44pixels. Try applying Google Material 3.',
            ],
          ],
        },
      ],
    },
    {
      type: 'text',
      title: 'Image Capture',
      body: [
        'Design the interface to mimic a smartphone camera, ensuring easy access to video mode, timer, zoom, and megapixel settings. Optimise for a small watch display with a familiar, intuitive layout. Users can snap photos via the on-screen shutter or the watch crown.',
      ],
    },
    {
      type: 'text',
      title: 'Video Capture',
      body: [
        'Users can quickly switch to the recording tab from the bottom navigation. Start, pause, resume, or stop recording with a tap. Snapshots can be taken anytime, and the recording time is displayed at the top for easy tracking—just like your phone camera.',
      ],
    },
    {
      type: 'text',
      title: 'Switches Compatibility',
      body: [
        "The mobile device connected to the watch may not support all features, such as zooming in and out or switching the camera's megapixel setting. Therefore, controls will only appear if the connected device supports those functions. If a specific feature isn't available, the corresponding control will be hidden, and the remaining options will be centered for better visibility and access.",
      ],
    },
    {
      type: 'text',
      title: 'Interactions & Gestures',
      body: [
        'I also created a quick prototype to demonstrate the interactions:',
        {
          list: [
            'Controls for zooming and adjusting camera settings.',
            'A shutter button that includes a countdown timer for taking photos.',
            'A tab to switch between photo and video modes.',
          ],
        },
      ],
    },
    {
      type: 'text',
      title: 'Assumptions defined early',
      body: [
        {
          list: [
            'Wear OS watches are made by various brands in three shapes: square, rectangle, and circle. This project uses a circular design, as it aligns with Wear OS guidelines optimized for circular screens, which are present in over 80% of Android watches.',
            'Each watch must have at least one physical button, and rotating the button or dial is not allowed due to inconsistent availability across devices.',
            'Live camera feeds are not supported; watches can only control the camera on a paired mobile device.',
          ],
        },
      ],
    },
    {
      type: 'text',
      title: 'Learnings',
      body: [
        {
          ordered: true,
          list: [
            'User Interface Design for Small Screens: Designing for a smartwatch teaches you to prioritize only essential features, enhancing your skills in creating minimalist, easy-to-navigate interfaces.',
            "Adaptive UI Elements: You learn to design UI elements that adapt based on the connected device's capabilities, like showing or hiding controls if the smartphone doesn’t support certain camera functions.",
            'Cross-Device Compatibility: Working on seamless app integration between the watch and various smartphones deepens your understanding of device syncing and communication, making sure a smooth user experience.',
          ],
        },
      ],
    },
  ],
};
