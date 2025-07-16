interface WelcomeHeaderProps {
  user: any;
}

const WelcomeHeader = ({ user }: WelcomeHeaderProps) => {
  const getWelcomeMessage = () => {
    if (!user) return "Welcome back!";

    const now = new Date();
    const hour = now.getHours();
    let timeGreeting = "";

    if (hour < 12) timeGreeting = "Good morning";
    else if (hour < 17) timeGreeting = "Good afternoon";
    else timeGreeting = "Good evening";

    const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || "there";

    return `${timeGreeting}, ${userName}!`;
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-foreground">{getWelcomeMessage()}</h1>
    </div>
  );
};

export default WelcomeHeader; 