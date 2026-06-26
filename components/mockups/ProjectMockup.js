import ScaledMockup from "./ScaledMockup";
import { BrowserChrome, ChatMock, DashboardMock, QueryMock } from "./Mockups";

const renderers = {
  chat: ChatMock,
  dashboard: DashboardMock,
  query: QueryMock,
};

// Wraps the right archetype in browser chrome, scaled to fill its container.
export default function ProjectMockup({ mockup }) {
  const Inner = renderers[mockup.type] || DashboardMock;
  return (
    <ScaledMockup designWidth={800} designHeight={500}>
      <div className="h-full w-full">
        <BrowserChrome url={mockup.url}>
          <Inner data={mockup.data} />
        </BrowserChrome>
      </div>
    </ScaledMockup>
  );
}
