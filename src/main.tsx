import { Devvit, useInterval, useState } from "@devvit/public-api";

Devvit.configure({
  redditAPI: true,
  themes: true,
});

// Add configuration menu options
Devvit.addSettings([
  {
    name: "backgroundColor",
    label: "Background Color",
    type: "string",
    defaultValue: "#f5f5f5",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    type: "string",
    defaultValue: "Welcome to our custom experience!",
  },
]);

// Enhanced menu item with confirmation
Devvit.addMenuItem({
  label: "Add showcase post",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (_event, context) => {
    const { reddit, ui } = context;

    // Show confirmation dialog
    const confirmed = await ui.showConfirmation({
      title: "Create Showcase Post",
      message:
        "This will create a new post demonstrating Devvit features. Continue?",
      confirmText: "Create Post",
      cancelText: "Cancel",
    });

    if (!confirmed) return;

    ui.showToast("Creating your showcase post...");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: "Devvit Feature Showcase",
      subredditName: subreddit.name,
      preview: (
        <vstack
          height="100%"
          width="100%"
          alignment="middle center"
          backgroundColor="#e0f7fa"
        >
          <spinner size="large" color="blue" />
          <text size="large">Preparing your interactive experience...</text>
        </vstack>
      ),
    });
    ui.showToast("Post created successfully!");
    ui.navigateTo(post);
  },
});

// Add a more feature-rich custom post type
Devvit.addCustomPostType({
  name: "Feature Showcase",
  height: "tall",
  render: (context) => {
    const { settings, reddit, ui } = context;
    const [counter, setCounter] = useState(0);
    const [theme, setTheme] = useState("light");
    const [currentTime, setCurrentTime] = useState(
      new Date().toLocaleTimeString()
    );
    const [showDetails, setShowDetails] = useState(false);
    const [upvotes, setUpvotes] = useState(0);
    const [loading, setLoading] = useState(false);

    // Get background color from settings or use default
    const backgroundColor = settings.backgroundColor || "#f5f5f5";
    const welcomeMessage =
      settings.welcomeMessage || "Welcome to our custom experience!";

    // Update time every second
    useInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Simulate fetching data
    const fetchData = async () => {
      setLoading(true);
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUpvotes(Math.floor(Math.random() * 100));
      setLoading(false);
    };

    // Styles based on theme
    const themeStyles = {
      light: {
        background: backgroundColor,
        text: "#333333",
        accent: "#0079d3",
      },
      dark: {
        background: "#1a1a1b",
        text: "#d7dadc",
        accent: "#4fbcff",
      },
    };

    const currentStyles = themeStyles[theme];

    return (
      <vstack
        height="100%"
        width="100%"
        gap="medium"
        padding="large"
        backgroundColor={currentStyles.background}
      >
        <hstack alignment="center middle" gap="medium">
          <image
            url="https://i.redd.it/redditlogo.png"
            description="Reddit Logo"
            imageHeight={128}
            imageWidth={128}
            height="48px"
            width="48px"
          />
          <text size="xlarge" color={currentStyles.text} weight="bold">
            {welcomeMessage}
          </text>
        </hstack>

        <spacer size="medium" />

        <hstack gap="medium" alignment="center middle">
          <text size="large" color={currentStyles.text}>
            Current Time: {currentTime}
          </text>
          <button
            appearance={theme === "light" ? "primary" : "secondary"}
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Toggle {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </hstack>

        <spacer size="medium" />

        <vstack
          backgroundColor={theme === "light" ? "#ffffff" : "#2d2d2e"}
          padding="medium"
          cornerRadius="medium"
          border={`1px solid ${currentStyles.accent}`}
        >
          <text size="large" color={currentStyles.text} weight="bold">
            Interactive Counter
          </text>
          <spacer size="small" />
          <text
            size="large"
            color={currentStyles.text}
          >{`Clicks: ${counter}`}</text>
          <spacer size="small" />
          <hstack gap="medium">
            <button
              appearance="primary"
              onPress={() => setCounter((prev) => prev + 1)}
              width="50%"
            >
              Increment
            </button>
            <button
              appearance="secondary"
              onPress={() => setCounter((prev) => Math.max(0, prev - 1))}
              width="50%"
            >
              Decrement
            </button>
          </hstack>
          <spacer size="small" />
          <button appearance="destructive" onPress={() => setCounter(0)}>
            Reset Counter
          </button>
        </vstack>

        <spacer size="medium" />

        <vstack
          backgroundColor={theme === "light" ? "#ffffff" : "#2d2d2e"}
          padding="medium"
          cornerRadius="medium"
          border={`1px solid ${currentStyles.accent}`}
        >
          <hstack gap="medium" alignment="center middle">
            <text size="large" color={currentStyles.text} weight="bold">
              Simulated Data
            </text>
            {loading && <spinner size="small" color={currentStyles.accent} />}
          </hstack>
          <spacer size="small" />
          <text color={currentStyles.text}>Sample upvotes: {upvotes}</text>
          <spacer size="small" />
          <button appearance="secondary" onPress={fetchData}>
            Refresh Data
          </button>
        </vstack>

        <spacer size="medium" />

        <button
          appearance="outline"
          onPress={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <vstack
            backgroundColor={theme === "light" ? "#ffffff" : "#2d2d2e"}
            padding="medium"
            cornerRadius="medium"
          >
            <text size="medium" color={currentStyles.text} weight="bold">
              Devvit Feature Demo
            </text>
            <spacer size="small" />
            <text size="small" color={currentStyles.text}>
              • Dynamic theming
            </text>
            <text size="small" color={currentStyles.text}>
              • Interactive counters
            </text>
            <text size="small" color={currentStyles.text}>
              • Time-based updates
            </text>
            <text size="small" color={currentStyles.text}>
              • Simulated data fetching
            </text>
            <text size="small" color={currentStyles.text}>
              • Customizable via settings
            </text>
          </vstack>
        )}

        <spacer size="medium" />

        <button
          appearance="primary"
          onPress={() => {
            ui.showToast("Thanks for checking out Devvit features!");
          }}
        >
          Say Thanks!
        </button>
      </vstack>
    );
  },
});

export default Devvit;
