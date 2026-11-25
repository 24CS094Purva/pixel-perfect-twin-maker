import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  BookOpenText,
  Building2,
  CalendarDays,
  ChevronDown,
  FilePlus2,
  FileText,
  Grid2X2,
  Link2,
  MoreVertical,
  Paperclip,
  ReceiptText,
  Search,
  Settings,
  SlidersHorizontal,
  UsersRound,
  WalletCards,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Invoice = {
  id: string;
  due: string;
  status: "Unsent" | "Viewed";
  amount: string;
  avatar: string;
};

const invoices: Invoice[] = [
  { id: "404-002", due: "In 2 days", status: "Unsent", amount: "$80,770.00", avatar: "profile--two" },
  { id: "426-001", due: "In 4 days", status: "Viewed", amount: "$27,114.00", avatar: "profile--four" },
  { id: "427-012", due: "In 5 days", status: "Unsent", amount: "$53,154.00", avatar: "profile--five" },
  { id: "424-112", due: "In 16 days", status: "Viewed", amount: "$61,223.00", avatar: "profile--three" },
  { id: "417-020", due: "In 19 days", status: "Viewed", amount: "$7,311.00", avatar: "profile--two" },
];

const navigationItems = [
  { label: "Estimates", icon: Grid2X2 },
  { label: "Invoices", icon: ReceiptText },
  { label: "Payments", icon: WalletCards },
  { label: "Recurring Invoices", icon: FileText },
  { label: "Checkouts", icon: BookOpenText },
];

function Profile({ tone = "", initials = "" }: { tone?: string; initials?: string }) {
  return (
    <span className={`profile ${tone}`} aria-hidden="true">
      <span>{initials}</span>
    </span>
  );
}

function InvoiceDashboard() {
  const [selectedId, setSelectedId] = useState("427-012");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTopTab, setActiveTopTab] = useState("Invoices");
  const [activeInvoiceTab, setActiveInvoiceTab] = useState("Unpaid");

  const filteredInvoices = useMemo(
    () => invoices.filter((invoice) => invoice.id.toLowerCase().includes(searchTerm.trim().toLowerCase())),
    [searchTerm],
  );
  const selectedInvoice = invoices.find((invoice) => invoice.id === selectedId);

  if (!selectedInvoice) return null;

  return (
    <main className="invoice-stage">
      <div className="invoice-screen" aria-label="Salesforce invoice dashboard">
        <header className="invoice-topbar">
          <div className="salesforce-brand" aria-label="Salesforce">
            <span className="salesforce-mark"><span /></span>
            <span>salesforce</span>
          </div>

          <nav className="top-nav" aria-label="Invoice sections">
            {navigationItems.map(({ label, icon: Icon }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                className={`top-nav-item ${activeTopTab === label ? "is-current" : ""}`}
                aria-pressed={activeTopTab === label}
                onClick={() => setActiveTopTab(label)}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </Button>
            ))}
          </nav>

          <div className="header-tools">
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Accounts" title="Accounts">
              <BookOpenText />
            </Button>
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Billing" title="Billing">
              <WalletCards />
            </Button>
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Companies" title="Companies">
              <Building2 />
            </Button>
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Documents" title="Documents">
              <FileText />
            </Button>
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Customers" title="Customers">
              <UsersRound />
            </Button>
            <span className="header-tools-spacer" />
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Notifications" title="Notifications">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon" className="header-icon" aria-label="Settings" title="Settings">
              <Settings />
            </Button>
            <Profile tone="profile--four" initials="" />
          </div>
        </header>

        <section className="invoice-title-row" aria-labelledby="invoices-heading">
          <Button variant="ghost" size="icon" className="back-button" aria-label="Back">
            <ArrowLeft />
          </Button>
          <h1 id="invoices-heading">Invoices</h1>
          <div className="title-actions">
            <Button variant="ghost" size="icon" className="back-button" aria-label="Invoice filters" title="Invoice filters">
              <SlidersHorizontal />
            </Button>
            <Button variant="outline" className="create-invoice-button" type="button">
              <FilePlus2 />
              <span>Create an invoice</span>
            </Button>
          </div>
        </section>

        <section className="summary-row" aria-label="Invoice summary">
          <div className="overview-panel">
            <div className="overview-metrics">
              <div>
                <span className="metric-label">Overdue</span>
                <div className="metric-value"><span className="currency">$</span>31,211.00</div>
              </div>
              <div>
                <span className="metric-label">Due within next month</span>
                <div className="metric-value"><span className="currency">$</span>172,560.00</div>
              </div>
              <div>
                <span className="metric-label">Average time to get paid</span>
                <div className="metric-value">12<small> days</small></div>
              </div>
            </div>
            <div className="timeline" aria-label="Monthly invoice activity">
              <div className="timeline-month">
                <span>Sep</span>
                <div className="timeline-track"><span style={{ width: "82%" }} /></div>
                <div className="timeline-people"><Profile tone="profile--two" /><Profile tone="profile--four" /><Profile tone="profile--three" /><Profile tone="profile--five" /><Profile tone="profile--two" /></div>
              </div>
              <div className="timeline-month">
                <span>Oct</span>
                <div className="timeline-track"><span style={{ width: "24%" }} /></div>
                <div className="timeline-people"><Profile tone="profile--three" /><Profile tone="profile--four" /><Profile tone="profile--two" /></div>
              </div>
              <div className="timeline-month">
                <span>Nov</span>
                <div className="timeline-track"><span style={{ width: "55%" }} /></div>
                <div className="timeline-people"><Profile tone="profile--five" /><Profile tone="profile--two" /><Profile tone="profile--four" /></div>
              </div>
              <div className="timeline-month">
                <span>Dec</span>
                <div className="timeline-track"><span style={{ width: "8%" }} /></div>
                <div className="timeline-people"><Profile tone="profile--three" /><Profile tone="profile--two" /></div>
              </div>
            </div>
          </div>

          <div className="payout-panel">
            <span className="payout-label">Available for Instant Payout</span>
            <Button variant="ghost" size="icon" className="payout-arrow" aria-label="Open payout details" title="Payout details">
              <ArrowUpRight />
            </Button>
            <div className="payout-value"><span><span className="currency">$</span>214,390.00</span><span className="expect-badge">Expects</span></div>
            <div className="payment-methods">
              <div className="payment-method"><strong>#4443</strong><small>Visa</small></div>
              <div className="payment-method is-active"><strong>#177210</strong><small>Stripe</small></div>
              <div className="payment-method"><strong>#711221</strong><small>PayPal</small></div>
              <Button type="button" className="payment-action">Pay out now</Button>
            </div>
          </div>
        </section>

        <section className="filters-row" aria-label="Filter invoices">
          <div className="active-filters">Active filters <span className="filter-count">2</span></div>
          <Button variant="outline" className="filter-pill">All customers <ChevronDown /></Button>
          <Button variant="outline" className="filter-pill">All statuses <ChevronDown /></Button>
          <Button variant="outline" className="filter-pill date-filter">November 2023 <CalendarDays /></Button>
          <Button variant="outline" className="filter-pill date-filter">December 2023 <CalendarDays /></Button>
          <label className="invoice-search">
            <Input
              aria-label="Search invoice number"
              placeholder="Enter invoice #"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Search aria-hidden="true" />
          </label>
        </section>

        <section className="invoice-workspace" aria-label="Unpaid invoice workspace">
          <div className="invoice-tabs" role="tablist" aria-label="Invoice groups">
            {[
              { label: "All Invoices", count: "" },
              { label: "Draft", count: "3" },
              { label: "Unpaid", count: "5" },
            ].map(({ label, count }) => (
              <Button
                key={label}
                type="button"
                variant="ghost"
                role="tab"
                aria-selected={activeInvoiceTab === label}
                className={`workspace-tab ${activeInvoiceTab === label ? "is-active" : ""}`}
                onClick={() => setActiveInvoiceTab(label)}
              >
                {label}{count && <span className="workspace-tab-count">{count}</span>}
              </Button>
            ))}
          </div>

          <div className="invoice-list-panel">
            <div className="list-heading">
              <span>Unpaid Invoices</span>
              <div className="list-heading-tools">
                <Button variant="ghost" size="icon" className="list-tool" aria-label="Sort invoices" title="Sort invoices"><ArrowDownUp /></Button>
                <Button variant="ghost" size="icon" className="list-tool" aria-label="More invoice options" title="More options"><MoreVertical /></Button>
              </div>
            </div>
            <div className="invoice-list">
              {filteredInvoices.map((invoice, index) => (
                <Button
                  key={invoice.id}
                  type="button"
                  variant="ghost"
                  className={`invoice-row ${selectedId === invoice.id ? "is-selected" : ""}`}
                  onClick={() => setSelectedId(invoice.id)}
                  aria-pressed={selectedId === invoice.id}
                >
                  <Profile tone={invoice.avatar} initials={index === 2 ? "MJ" : ""} />
                  <span className="invoice-id-group"><strong># {invoice.id}</strong><small>{invoice.due}</small></span>
                  <span className="invoice-status">{invoice.status}</span>
                  <span className="invoice-row-amount">{invoice.amount}</span>
                </Button>
              ))}
              {filteredInvoices.length === 0 && <div className="empty-search">No matching invoices</div>}
            </div>
          </div>

          <div className="invoice-detail">
            <div className="detail-header">
              <div>
                <span className="detail-label">Invoice details</span>
                <div className="detail-number"># {selectedInvoice.id}<small>{selectedInvoice.status}</small></div>
              </div>
              <div>
                <span className="detail-label">Company</span>
                <div className="company-name">BlueRock <span className="company-gem" aria-hidden="true" /></div>
              </div>
              <div>
                <span className="detail-label">Customer</span>
                <div className="customer-info">
                  <Profile tone="profile--five" initials="MJ" />
                  <span className="customer-name">Maria Jones<small>CEO BlueRock Pvt Ltd.</small></span>
                </div>
              </div>
            </div>

            <div className="service-grid">
              <div className="service-card"><span className="service-amount">$10,630.80 <ArrowUpRight size={10} /></span><span className="service-title">Concept Development</span></div>
              <div className="service-card"><span className="service-amount">$31,892.40 <ArrowUpRight size={10} /></span><span className="service-title">CRM Development</span></div>
              <div className="service-card"><span className="service-amount">$10,630.80 <ArrowUpRight size={10} /></span><span className="service-title">CRM Integration</span></div>
              <div className="service-card service-more" aria-label="Add service">+</div>
            </div>

            <div className="invoice-total-row">
              <div className="total-item"><span>Sub Total</span><strong>{selectedInvoice.amount}</strong></div>
              <div className="total-item"><span>Total</span><strong>{selectedInvoice.amount}</strong></div>
              <div className="total-item"><span>Balance Due</span><strong>{selectedInvoice.amount}</strong></div>
              <Button variant="ghost" size="icon" className="detail-icon" aria-label="Attach a file" title="Attach a file"><Paperclip /></Button>
              <Button variant="ghost" size="icon" className="detail-icon" aria-label="View invoice" title="View invoice"><Link2 /></Button>
              <Button type="button" className="detail-pay-button">Pay out now</Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Invoices — Salesforce" },
      { name: "description", content: "A Salesforce-style overview of invoices, upcoming payments, and customer balances." },
      { property: "og:title", content: "Invoices — Salesforce" },
      { property: "og:description", content: "A Salesforce-style overview of invoices, upcoming payments, and customer balances." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvoiceDashboard,
});