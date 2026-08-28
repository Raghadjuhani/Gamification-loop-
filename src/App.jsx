import { useMemo, useState } from "react";

const SCREENS = {
  DASHBOARD: "dashboard",
  EMAIL: "email",
  ACTION: "action",
  REWARD: "reward",
  INVESTMENT: "investment",
};

const CATEGORIES = ["Software", "Payroll", "Revenue"];

const TRANSACTIONS = [
  { id: "figma", name: "Figma", detail: "Oct 3 · Subscription", amount: "−$45.00" },
  { id: "gusto", name: "Gusto", detail: "Oct 4 · ACH debit", amount: "−$14,280.00" },
  { id: "northwind", name: "Northwind LLC", detail: "Oct 5 · Incoming", amount: "+$9,500.00" },
];

const TRIGGER_COPY =
  "3 transactions need categorizing before your Q4 forecast can update";
const TRIGGER_EMAIL_BODY =
  "Categorize 3 transactions to update your Q4 cash forecast.";

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

function PlaceholderChart() {
  const bars = [38, 52, 44, 61, 55, 72];

  return (
    <div className="rounded-card border border-line bg-surface px-4 py-4">
      <p className="mb-4 text-[12px] text-muted">Q4 cash forecast</p>
      <div className="flex h-32 items-end gap-2" aria-hidden="true">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-sm bg-[#1c2840]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11px] text-muted">
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
    </div>
  );
}

function ScreenDashboard({ onAdvance }) {
  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-16">
      <header className="mb-4 flex items-baseline justify-between">
        <Wordmark />
        <span className="text-[12px] text-muted">Q4</span>
      </header>

      <button
        type="button"
        onClick={onAdvance}
        className="mb-4 w-full rounded-card border border-line bg-surface px-4 py-3.5 text-left transition-colors hover:border-[#31425f] focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label={TRIGGER_COPY}
      >
        <p className="text-[15px] font-medium leading-snug text-ink">{TRIGGER_COPY}</p>
        <p className="mt-2 text-[13px] text-muted">Takes under a minute</p>
      </button>

      <PlaceholderChart />
    </div>
  );
}

function ScreenEmail({ onAdvance }) {
  return (
    <div className="flex h-full flex-col px-6 pb-6 pt-16">
      <p className="mb-4 text-[12px] text-muted">Inbox</p>

      <article className="rounded-card border border-line bg-surface px-4 py-4">
        <p className="text-[12px] text-muted">From</p>
        <p className="mt-0.5 text-[14px] font-medium text-ink">FinWise</p>

        <div className="my-4 h-px bg-line" />

        <p className="text-[12px] text-muted">Subject</p>
        <p className="mt-0.5 text-[15px] font-medium leading-snug text-ink">
          3 transactions are holding up your forecast
        </p>

        <div className="my-4 h-px bg-line" />

        <p className="text-[15px] leading-relaxed text-ink">{TRIGGER_EMAIL_BODY}</p>

        <button
          type="button"
          onClick={onAdvance}
          className="mt-5 h-11 w-full rounded-control bg-accent text-[14px] font-semibold text-base transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          Review now
        </button>
      </article>
    </div>
  );
}

function ScreenAction({ categories, onCategorize, onAdvance }) {
  const allCategorized = TRANSACTIONS.every((txn) => Boolean(categories[txn.id]));

  return (
    <form
      className="flex h-full flex-col px-6 pb-6 pt-16"
      onSubmit={(event) => {
        event.preventDefault();
        if (allCategorized) onAdvance();
      }}
    >
      <h1 className="mb-5 text-[22px] font-semibold leading-tight tracking-tight text-ink">
        Categorize 3 transactions
      </h1>

      <ul className="flex flex-col gap-3">
        {TRANSACTIONS.map((txn) => (
          <li key={txn.id} className="rounded-card border border-line bg-surface px-3.5 py-3">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <div>
                <p className="text-[14px] font-medium text-ink">{txn.name}</p>
                <p className="mt-0.5 text-[12px] text-muted">{txn.detail}</p>
              </div>
              <p className="shrink-0 text-[13px] text-ink">{txn.amount}</p>
            </div>
            <label htmlFor={`category-${txn.id}`} className="sr-only">
              Category for {txn.name}
            </label>
            <select
              id={`category-${txn.id}`}
              value={categories[txn.id]}
              onChange={(event) => onCategorize(txn.id, event.target.value)}
              className="h-10 w-full rounded-control border border-line bg-base px-3 text-[14px] text-ink outline-none focus:border-accent"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        disabled={!allCategorized}
        className={`mt-auto h-12 w-full rounded-control text-[15px] font-semibold focus:outline-none ${
          allCategorized
            ? "bg-accent text-base hover:opacity-90 focus:ring-2 focus:ring-accent/40"
            : "cursor-not-allowed bg-[#1c2840] text-muted"
        }`}
      >
        Update forecast
      </button>
    </form>
  );
}

function ScreenReward({ onAdvance }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 pb-6 pt-16 text-center">
      <p className="mb-4 max-w-[16rem] text-[14px] text-muted">
        Because you categorized those transactions:
      </p>
      <p className="text-[18px] font-medium text-ink">Runway extended by</p>
      <p className="mt-2 text-[44px] font-semibold leading-none tracking-tight text-accent">
        3 weeks
      </p>
      <p className="mt-4 text-[14px] text-muted">vs. before this update</p>
      <button
        type="button"
        onClick={onAdvance}
        className="mt-10 text-[14px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink focus:outline-none focus:text-ink"
      >
        See full forecast
      </button>
    </div>
  );
}

function ScreenInvestment({
  email,
  onEmailChange,
  collaborators,
  categorizedCount,
  onSend,
}) {
  const sent = collaborators > 0;

  return (
    <form
      className="flex h-full flex-col px-6 pb-6 pt-16"
      onSubmit={(event) => {
        event.preventDefault();
        if (!sent) onSend();
      }}
    >
      <h1 className="mb-3 text-[22px] font-semibold leading-tight tracking-tight text-ink">
        Your accountant won’t have to ask you for this again
      </h1>
      <p className="mb-5 text-[14px] leading-relaxed text-muted">
        Once invited, they see forecast updates automatically — every future
        resolved trigger reaches them too.
      </p>

      <div className="mb-6 rounded-card border border-line bg-surface px-4 py-2">
        <div className="flex items-center justify-between border-b border-line py-2.5">
          <span className="text-[13px] text-muted">Data sources</span>
          <span className="text-[13px] font-medium text-ink">2</span>
        </div>
        <div className="flex items-center justify-between border-b border-line py-2.5">
          <span className="text-[13px] text-muted">Transactions categorized</span>
          <span className="text-[13px] font-medium text-ink">{categorizedCount}</span>
        </div>
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[13px] text-muted">Collaborators invited</span>
          <span
            className={`text-[13px] font-medium ${
              sent ? "text-accent" : "text-ink"
            }`}
          >
            {collaborators}
          </span>
        </div>
      </div>

      <label htmlFor="invite-email" className="mb-2 block text-[14px] text-ink">
        Email address
      </label>
      <input
        id="invite-email"
        name="email"
        type="email"
        required
        disabled={sent}
        autoComplete="email"
        placeholder="name@firm.com"
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        className="h-12 w-full rounded-control border border-line bg-surface px-4 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-60"
      />

      <button
        type="submit"
        disabled={sent}
        className={`mt-auto h-12 w-full rounded-control text-[15px] font-semibold focus:outline-none ${
          sent
            ? "cursor-not-allowed bg-[#1c2840] text-muted"
            : "bg-accent text-base hover:opacity-90 focus:ring-2 focus:ring-accent/40"
        }`}
      >
        {sent ? "Invite sent" : "Send invite"}
      </button>
    </form>
  );
}

function ChannelSwitch({ channel, onChange }) {
  const options = [
    { id: SCREENS.DASHBOARD, label: "Dashboard" },
    { id: SCREENS.EMAIL, label: "Email" },
  ];

  return (
    <div className="mb-4 flex flex-col items-center gap-2">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted">
        Trigger channel
      </p>
      <div className="flex rounded-control border border-line bg-surface p-0.5">
        {options.map((option) => {
          const active = channel === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`h-8 min-w-[104px] rounded-[6px] px-3 text-[13px] ${
                active ? "bg-line text-ink" : "text-muted hover:text-ink"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const emptyCategories = () =>
  TRANSACTIONS.reduce((acc, txn) => {
    acc[txn.id] = "";
    return acc;
  }, {});

export default function App() {
  const [screen, setScreen] = useState(SCREENS.DASHBOARD);
  const [entry, setEntry] = useState(SCREENS.DASHBOARD);
  const [categories, setCategories] = useState(emptyCategories);
  const [email, setEmail] = useState("");
  const [collaborators, setCollaborators] = useState(0);

  const categorizedCount = useMemo(
    () => TRANSACTIONS.filter((txn) => Boolean(categories[txn.id])).length,
    [categories]
  );

  const isTrigger = screen === SCREENS.DASHBOARD || screen === SCREENS.EMAIL;

  function startFrom(channel) {
    setEntry(channel);
    setScreen(channel);
    setCategories(emptyCategories());
    setEmail("");
    setCollaborators(0);
  }

  function goToAction() {
    setScreen(SCREENS.ACTION);
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-base sm:p-6">
      {isTrigger && (
        <ChannelSwitch channel={entry} onChange={startFrom} />
      )}

      <PhoneFrame>
        {screen === SCREENS.DASHBOARD && (
          <ScreenDashboard onAdvance={goToAction} />
        )}
        {screen === SCREENS.EMAIL && <ScreenEmail onAdvance={goToAction} />}
        {screen === SCREENS.ACTION && (
          <ScreenAction
            categories={categories}
            onCategorize={(id, value) =>
              setCategories((current) => ({ ...current, [id]: value }))
            }
            onAdvance={() => setScreen(SCREENS.REWARD)}
          />
        )}
        {screen === SCREENS.REWARD && (
          <ScreenReward onAdvance={() => setScreen(SCREENS.INVESTMENT)} />
        )}
        {screen === SCREENS.INVESTMENT && (
          <ScreenInvestment
            email={email}
            onEmailChange={setEmail}
            collaborators={collaborators}
            categorizedCount={categorizedCount}
            onSend={() => setCollaborators(1)}
          />
        )}
      </PhoneFrame>
    </main>
  );
}
