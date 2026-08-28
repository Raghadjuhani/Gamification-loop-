import { useMemo, useState } from "react";

const SCREENS = {
  TRIGGER: 1,
  ACTION: 2,
  REWARD: 3,
  INVESTMENT: 4,
};

function Wordmark() {
  return <span className="text-[13px] font-semibold text-ink">FinWise</span>;
}

function PhoneFrame({ children }) {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-base sm:h-[760px] sm:w-[390px] sm:rounded-[40px] sm:border sm:border-line sm:shadow-[0_0_0_10px_#080d18,0_32px_80px_rgba(0,0,0,0.45)]">
      <div className="pointer-events-none absolute left-1/2 top-[10px] z-20 hidden h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-[#070b14] sm:block" />
      <div className="h-full w-full">{children}</div>
    </div>
  );
}

function ScreenTrigger({ onAdvance }) {
  return (
    <div className="flex h-full flex-col px-6 pt-16">
      <button
        type="button"
        onClick={onAdvance}
        className="w-full rounded-card border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-[#31425f] focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label="Your Q4 cash position updated — see what changed"
      >
        <div className="mb-2 flex items-center justify-between">
          <Wordmark />
          <span className="text-[11px] text-muted">2m ago</span>
        </div>
        <p className="text-[15px] font-medium leading-snug text-ink">
          Your Q4 cash position updated — see what changed
        </p>
      </button>
    </div>
  );
}

function ScreenAction({ growth, onGrowthChange, onAdvance }) {
  return (
    <form
      className="flex h-full flex-col px-6 pb-6 pt-16"
      onSubmit={(event) => {
        event.preventDefault();
        onAdvance();
      }}
    >
      <p className="mb-1 text-[13px] text-muted">Takes under a minute</p>
      <h1 className="mb-8 text-[26px] font-semibold leading-tight tracking-tight text-ink">
        Update your numbers
      </h1>

      <label htmlFor="growth" className="mb-2 block text-[14px] text-ink">
        Monthly revenue growth
      </label>
      <div className="relative">
        <input
          id="growth"
          name="growth"
          type="number"
          inputMode="decimal"
          step="0.1"
          value={growth}
          onChange={(event) => onGrowthChange(event.target.value)}
          className="h-12 w-full rounded-control border border-line bg-surface px-4 pr-10 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
        />
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[14px] text-muted">
          %
        </span>
      </div>

      <button
        type="submit"
        className="mt-auto h-12 w-full rounded-control bg-accent text-[15px] font-semibold text-base transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        Update
      </button>
    </form>
  );
}

function ScreenReward({ positive, onAdvance }) {
  const color = positive ? "text-accent" : "text-rust";
  const headline = positive ? "Runway extended by" : "Runway shortened by";
  const amount = positive ? "3 weeks" : "2 weeks";

  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pb-6 pt-16 text-center">
      <p className="mb-3 text-[18px] font-medium text-ink">{headline}</p>
      <p className={`text-[44px] font-semibold leading-none tracking-tight ${color}`}>
        {amount}
      </p>
      <p className="mt-4 text-[14px] text-muted">vs. last update</p>
      <button
        type="button"
        onClick={onAdvance}
        className="mt-10 text-[14px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink focus:outline-none focus:text-ink"
      >
        See full model
      </button>
    </div>
  );
}

function ScreenInvestment({ email, onEmailChange, sent, onSend }) {
  if (sent) {
    return (
      <div className="flex h-full flex-col px-6 pb-6 pt-16">
        <h1 className="mb-3 text-[26px] font-semibold leading-tight tracking-tight text-ink">
          Invite sent
        </h1>
        <p className="text-[15px] leading-relaxed text-muted">
          {email} can now work from the same numbers.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex h-full flex-col px-6 pb-6 pt-16"
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
    >
      <h1 className="mb-3 text-[26px] font-semibold leading-tight tracking-tight text-ink">
        Share this with your accountant or bookkeeper
      </h1>
      <p className="mb-8 text-[15px] leading-relaxed text-muted">
        FinWise gets more useful when the people who touch the books can work
        from the same numbers.
      </p>

      <label htmlFor="invite-email" className="mb-2 block text-[14px] text-ink">
        Email address
      </label>
      <input
        id="invite-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="name@firm.com"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        className="h-12 w-full rounded-control border border-line bg-surface px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent"
      />

      <button
        type="submit"
        className="mt-auto h-12 w-full rounded-control bg-accent text-[15px] font-semibold text-base transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        Send invite
      </button>
    </form>
  );
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.TRIGGER);
  const [growth, setGrowth] = useState("4");
  const [email, setEmail] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const positive = useMemo(() => {
    const value = Number.parseFloat(growth);
    return Number.isNaN(value) ? true : value >= 0;
  }, [growth]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-base sm:p-6">
      <PhoneFrame>
        {screen === SCREENS.TRIGGER && (
          <ScreenTrigger onAdvance={() => setScreen(SCREENS.ACTION)} />
        )}
        {screen === SCREENS.ACTION && (
          <ScreenAction
            growth={growth}
            onGrowthChange={setGrowth}
            onAdvance={() => setScreen(SCREENS.REWARD)}
          />
        )}
        {screen === SCREENS.REWARD && (
          <ScreenReward
            positive={positive}
            onAdvance={() => setScreen(SCREENS.INVESTMENT)}
          />
        )}
        {screen === SCREENS.INVESTMENT && (
          <ScreenInvestment
            email={email}
            onEmailChange={setEmail}
            sent={inviteSent}
            onSend={() => setInviteSent(true)}
          />
        )}
      </PhoneFrame>
    </main>
  );
}
