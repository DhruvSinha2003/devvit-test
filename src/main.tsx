// Learn more at developers.reddit.com/docs
import { Devvit, useState } from "@devvit/public-api";

Devvit.configure({
  redditAPI: true,
});

Devvit.addMenuItem({
  label: "Add my post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Creating your awesome post...");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: "✨ Welcome to Our Community! ✨",
      subredditName: subreddit.name,
      preview: (
        <vstack
          height="100%"
          width="100%"
          alignment="middle center"
          gap="large"
        >
          <hstack gap="medium" alignment="middle center">
            <image
              url="https://i.imgur.com/6xYGNzk.gif"
              description="Loading animation"
              height="32px"
              width="32px"
            />
            <text size="xlarge" weight="bold">
              Preparing Something Special...
            </text>
          </hstack>
          <text color="secondary">Your awesome content is on its way!</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: "Experience Post",
  height: "tall",
  render: (_context) => {
    const [counter, setCounter] = useState(0);

    return (
      <vstack
        height="100%"
        width="100%"
        gap="large"
        padding="medium"
        alignment="center middle"
      >
        <hstack gap="medium" alignment="middle center">
          <image
            url="https://i.imgur.com/RxMJH3G.png"
            description="Community icon"
            height="64px"
            width="64px"
          />
          <text size="xxlarge" weight="bold">
            Community Hub
          </text>
        </hstack>

        <vstack
          backgroundColor="#1A1A1B" // Changed from "neutral"
          padding="medium"
          borderRadius="medium"
          width="80%"
        >
          <text size="large" weight="bold" color="#0079D3">
            {" "}
            // Changed from "accent" Interactive Counter
          </text>
          <text size="medium" color="#787C7E">
            {" "}
            // Changed from "secondary" You've clicked {counter} times!
          </text>
          <spacer size="medium" />
          <button
            appearance="primary"
            onPress={() => setCounter((prev) => prev + 1)}
            width="100%"
          >
            Click to Interact!
          </button>
        </vstack>
      </vstack>
    );
  },
});

export default Devvit;
