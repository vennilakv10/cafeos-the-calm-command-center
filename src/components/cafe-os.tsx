import { useState, type ComponentType, type ReactNode } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Boxes,
  Building2, CalendarDays, Check, CheckCircle2, ChevronDown, ChefHat, CircleDollarSign,
  Clock3, Coffee, CreditCard, Globe2, Grid2X2, IndianRupee, LayoutDashboard, ListOrdered,
  Menu as MenuIcon, Minus, MoreHorizontal, PackageCheck, PanelLeftClose, Plus, ReceiptText,
  Search, Settings, ShoppingBag, ShoppingCart, Sparkles, Store, Table2, Trash2, TrendingUp,
  UserRound, UsersRound, Utensils, WalletCards, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type View = "home" | "pos" | "orders" | "tables" | "kitchen" | "menu" | "inventory" | "recipes" | "purchases" | "finance" | "analytics" | "staff" | "online" | "branches" | "settings";
type Icon = ComponentType<{ className?: string; strokeWidth?: number }>;

const navigation: { id: View; label: string; icon: Icon; group?: string; badge?: string }[] = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "pos", label: "POS", icon: ShoppingCart },
  { id: "orders", label: "Orders", icon: ListOrdered, badge: "12" },
  { id: "tables", label: "Tables", icon: Grid2X2 },
  { id: "kitchen", label: "Kitchen", icon: ChefHat, badge: "7" },
  { id: "online", label: "Online Orders", icon: Globe2, badge: "3" },
  { id: "menu", label: "Menu", icon: Utensils, group: "Manage" },
  { id: "inventory", label: "Inventory", icon: Boxes, badge: "4" },
  { id: "recipes", label: "Recipes & Costing", icon: ReceiptText },
  { id: "purchases", label: "Purchases", icon: PackageCheck },
  { id: "finance", label: "Finance", icon: WalletCards, group: "Business" },
  { id: "analytics", label: "Analytics", icon: TrendingUp },
  { id: "staff", label: "Staff", icon: UsersRound },
  { id: "branches", label: "Branches", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const titles: Record<View, { title: string; subtitle: string }> = {
  home: { title: "Good morning, Fahad.", subtitle: "Here’s how Morning Dew Coffee is doing today." },
  pos: { title: "Point of sale", subtitle: "Kochi · Main counter" },
  orders: { title: "Orders", subtitle: "Every order, one clear workflow." },
  tables: { title: "Tables", subtitle: "Ground floor · 14 tables" },
  kitchen: { title: "Kitchen display", subtitle: "All stations · Live queue" },
  menu: { title: "Menu", subtitle: "Products, pricing and availability." },
  inventory: { title: "Inventory", subtitle: "Know what needs attention before service is affected." },
  recipes: { title: "Recipes & food cost", subtitle: "See exactly how ingredients shape your margin." },
  purchases: { title: "Purchases", subtitle: "From low stock to supplier payment, without the paperwork maze." },
  finance: { title: "Finance", subtitle: "Your money, explained simply." },
  analytics: { title: "Analytics", subtitle: "Understand what changed, why, and what to do next." },
  staff: { title: "Staff", subtitle: "Today’s team, shifts and activity." },
  online: { title: "Online orders", subtitle: "CafeOS, Swiggy and Zomato in one operational flow." },
  branches: { title: "Branches", subtitle: "One business, clearly seen across every location." },
  settings: { title: "Settings", subtitle: "Adapt CafeOS to each market, branch and team." },
};

const products = [
  { name: "Cappuccino", price: 180, category: "Coffee", tone: "latte", icon: "☕" },
  { name: "Iced Latte", price: 210, category: "Cold drinks", tone: "ice", icon: "🥤" },
  { name: "Espresso", price: 120, category: "Coffee", tone: "dark", icon: "☕" },
  { name: "Cold Brew", price: 230, category: "Cold drinks", tone: "brew", icon: "🧋" },
  { name: "Chicken Burger", price: 249, category: "Food", tone: "burger", icon: "🍔" },
  { name: "Paneer Wrap", price: 220, category: "Food", tone: "wrap", icon: "🌯" },
  { name: "French Fries", price: 140, category: "Sides", tone: "fries", icon: "🍟" },
  { name: "Brownie", price: 150, category: "Desserts", tone: "brownie", icon: "🍫" },
];

function Status({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "info" | "neutral" }) {
  return <span className={cn("status", `status-${tone}`)}><span className="status-dot" />{children}</span>;
}

function Metric({ label, value, note, positive }: { label: string; value: string; note?: string; positive?: boolean }) {
  return <div className="metric"><p>{label}</p><strong>{value}</strong>{note && <span className={positive ? "text-success" : "text-muted-foreground"}>{positive && <ArrowUpRight className="size-3.5" />}{note}</span>}</div>;
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <div className="section-heading"><h2>{title}</h2>{action && <button>{action}<ArrowRight className="size-4" /></button>}</div>;
}

export function CafeOS() {
  const [view, setView] = useState<View>("home");
  const [branch, setBranch] = useState("Kochi");
  const [sidebar, setSidebar] = useState(false);
  const [search, setSearch] = useState(false);
  const [notice, setNotice] = useState(false);

  return (
    <div className="app-shell">
      <aside className={cn("sidebar", sidebar && "sidebar-open")}>
        <div className="brand"><div className="brand-mark"><Coffee /></div><div><strong>CafeOS</strong><span>MORNING DEW COFFEE</span></div><button className="mobile-close" onClick={() => setSidebar(false)}><X /></button></div>
        <button className="branch-picker" onClick={() => setBranch(branch === "Kochi" ? "Dubai" : "Kochi")}><span className="branch-icon"><Store /></span><span><small>Current branch</small><b>{branch}</b></span><ChevronDown /></button>
        <nav>
          {navigation.map((item, index) => {
            const previous = navigation[index - 1];
            return <div key={item.id}>{item.group && item.group !== previous?.group && <p className="nav-group">{item.group}</p>}<button className={cn("nav-item", view === item.id && "nav-active")} onClick={() => { setView(item.id); setSidebar(false); }}><item.icon /><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</button></div>;
          })}
        </nav>
        <div className="sidebar-footer"><div className="system-status"><span /><div><b>All systems operational</b><small>Last sync 10 sec ago</small></div></div><button className="profile"><span>FK</span><div><b>Fahad Khan</b><small>Owner</small></div><MoreHorizontal /></button></div>
      </aside>
      {sidebar && <button aria-label="Close navigation" className="sidebar-backdrop" onClick={() => setSidebar(false)} />}
      <main className={cn("main", view === "kitchen" && "main-kitchen", view === "pos" && "main-pos")}>
        <header className="topbar">
          <button className="menu-trigger" onClick={() => setSidebar(true)}><MenuIcon /></button>
          <div className="page-title"><h1>{titles[view].title}</h1><p>{titles[view].subtitle}</p></div>
          <div className="top-actions"><button className="search-trigger" onClick={() => setSearch(!search)}><Search /><span>Search anything</span><kbd>⌘ K</kbd></button><button className="icon-button" onClick={() => setNotice(!notice)} aria-label="Notifications"><Bell /><i /></button><div className="today"><CalendarDays /><span><small>Today</small><b>24 Sep</b></span></div></div>
          {notice && <div className="notification-panel"><b>Action centre</b><p>3 online orders are waiting.</p><p>Chicken stock is running low.</p><Button size="sm" onClick={() => { setView("online"); setNotice(false); }}>Review now</Button></div>}
        </header>
        {search && <div className="command-bar"><Search /><input autoFocus placeholder="Search orders, products, tables or actions…" /><kbd>Esc</kbd></div>}
        <div className={cn("workspace", view === "pos" && "workspace-pos", view === "kitchen" && "workspace-kitchen")}>
          {view === "home" && <Home setView={setView} />}
          {view === "pos" && <POS />}
          {view === "orders" && <Orders />}
          {view === "tables" && <Tables />}
          {view === "kitchen" && <Kitchen />}
          {view === "inventory" && <Inventory />}
          {view === "recipes" && <Recipes />}
          {view === "purchases" && <Purchases />}
          {view === "finance" && <Finance />}
          {view === "analytics" && <Analytics />}
          {view === "online" && <OnlineOrders />}
          {view === "menu" && <MenuManagement />}
          {view === "staff" && <Staff />}
          {view === "branches" && <Branches />}
          {view === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

function Home({ setView }: { setView: (view: View) => void }) {
  const alerts = [
    { tone: "danger", icon: Boxes, title: "Chicken stock is running low", detail: "Expected to run out tomorrow evening.", action: "Review stock", view: "inventory" as View },
    { tone: "warning", icon: Clock3, title: "3 orders took longer than 20 minutes", detail: "Most delays happened between 1:00–1:30 PM.", action: "See orders", view: "orders" as View },
    { tone: "info", icon: CreditCard, title: "Supplier payment of ₹18,400 is due tomorrow", detail: "Fresh Foods Kerala · Invoice FF-2918", action: "Review payment", view: "purchases" as View },
  ];
  return <div className="page-stack">
    <section className="business-summary"><div className="summary-main"><span>Today’s business</span><strong>₹48,920</strong><p><b><ArrowUpRight />12.4%</b> vs yesterday at this time</p></div><div className="summary-metrics"><Metric label="Orders" value="184" note="23 more than yesterday" positive /><Metric label="Average order" value="₹266" note="Up by ₹18" positive /><Metric label="Gross profit" value="₹29,840" note="61% margin" /></div></section>
    <section><SectionHeading title="Needs attention" action="View action centre" /><div className="attention-list">{alerts.map(({ tone, icon: Icon, title, detail, action, view }) => <article className="attention-row" key={title}><span className={cn("attention-icon", `attention-${tone}`)}><Icon /></span><div><h3>{title}</h3><p>{detail}</p></div><Button variant="secondary" size="sm" onClick={() => setView(view)}>{action}<ArrowRight /></Button></article>)}</div></section>
    <section className="home-grid"><div><SectionHeading title="Today, hour by hour" action="Open analytics" /><div className="chart-card"><div className="chart-key"><span><i className="key-current" />Today</span><span><i />Yesterday</span></div><div className="bar-chart">{[22,35,48,42,70,92,68,78,56,40,31].map((height, i) => <div className="bar-slot" key={i}><i style={{ height: `${Math.max(height - 14, 8)}%` }} /><b style={{ height: `${height}%` }} />{i % 2 === 0 && <span>{9 + i > 12 ? `${9 + i - 12}p` : `${9 + i}a`}</span>}</div>)}</div></div></div><div><SectionHeading title="Live operations" /><div className="operations-card"><div><span className="live-dot" /><p><b>7 orders</b> in progress</p><small>Oldest waiting 8 min</small></div><div><ChefHat /><p><b>Kitchen is on pace</b></p><small>Avg. prep 11 min</small></div><div><UsersRound /><p><b>9 staff</b> checked in</p><small>2 shifts end at 5 PM</small></div><Button variant="secondary" onClick={() => setView("kitchen")}>Open kitchen display<ArrowRight /></Button></div></div></section>
  </div>;
}

function POS() {
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("Dine-in");
  const [cart, setCart] = useState([{ name: "Chicken Burger", price: 249, qty: 1 }, { name: "Cappuccino", price: 180, qty: 1 }]);
  const shown = category === "All" ? products : products.filter(p => p.category === category);
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const add = (name: string, price: number) => setCart(c => { const exists = c.find(i => i.name === name); return exists ? c.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i) : [...c, { name, price, qty: 1 }]; });
  const qty = (name: string, delta: number) => setCart(c => c.map(i => i.name === name ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0));
  return <div className="pos-layout"><aside className="category-list">{["All", "Coffee", "Cold drinks", "Food", "Sides", "Desserts"].map(c => <button className={category === c ? "category-active" : ""} onClick={() => setCategory(c)} key={c}>{c}<span>{c === "All" ? 8 : products.filter(p => p.category === c).length}</span></button>)}</aside><section className="product-zone"><div className="pos-tools"><div className="segmented">{["Dine-in", "Takeaway", "Delivery"].map(m => <button className={mode === m ? "selected" : ""} onClick={() => setMode(m)} key={m}>{m}</button>)}</div><div className="product-search"><Search /><input placeholder="Search products" /></div></div><div className="product-grid">{shown.map(p => <button className="product-card" key={p.name} onClick={() => add(p.name, p.price)}><div className={cn("product-art", `art-${p.tone}`)}><span>{p.icon}</span>{p.name === "Paneer Wrap" && <em>2 options</em>}</div><div><b>{p.name}</b><span>₹{p.price}</span></div></button>)}</div></section><aside className="order-panel"><div className="order-head"><div><small>Current order</small><h2>Table 08</h2></div><Button variant="ghost" size="icon"><MoreHorizontal /></Button></div><button className="customer-row"><UserRound /><span><b>Add customer</b><small>Loyalty & order history</small></span><Plus /></button><div className="order-items">{cart.length === 0 ? <div className="empty-order"><ShoppingBag /><b>Your order is empty</b><span>Tap a product to add it</span></div> : cart.map(item => <div className="order-item" key={item.name}><div><b>{item.name}</b><small>{item.name === "Chicken Burger" ? "Regular · No onions" : "Regular"}</small></div><div className="quantity"><button onClick={() => qty(item.name, -1)}><Minus /></button><b>{item.qty}</b><button onClick={() => qty(item.name, 1)}><Plus /></button></div><strong>₹{item.price * item.qty}</strong></div>)}</div><div className="order-actions"><button><ReceiptText />Discount</button><button><PauseIcon />Hold</button><button><UsersRound />Split</button></div><div className="totals"><p><span>Subtotal</span><b>₹{total}</b></p><p><span>GST 5%</span><b>₹{Math.round(total * .05)}</b></p><p className="total"><span>Total</span><strong>₹{Math.round(total * 1.05)}</strong></p></div><Button size="lg" disabled={!cart.length}>Charge ₹{Math.round(total * 1.05)}<ArrowRight /></Button></aside></div>;
}

function PauseIcon() { return <span className="pause-icon">Ⅱ</span>; }

type OrderRow = [string, string, string, string, string, string, string];
const orderRows: OrderRow[] = [
  ["#1842", "Table 08", "Dine-in", "Chicken Burger, Cappuccino", "₹450", "Preparing", "8 min"],
  ["#1841", "SW-1824", "Swiggy", "2 Chicken Burger, Fries, 2 Coke", "₹778", "New", "1 min"],
  ["#1840", "Counter", "Takeaway", "2 Iced Latte, Brownie", "₹570", "Ready", "12 min"],
  ["#1839", "Table 12", "Dine-in", "Paneer Wrap, Cold Brew", "₹472", "Preparing", "17 min"],
  ["#1838", "ZO-9481", "Zomato", "3 Cappuccino, French Fries", "₹680", "Out for delivery", "24 min"],
];

function Orders() { const [selected, setSelected] = useState(0); const order: OrderRow = orderRows[selected] ?? ["#—", "Unknown", "CafeOS", "No items", "₹0", "New", "0 min"]; return <div className="split-view"><section className="list-pane"><div className="filter-row"><div className="segmented"><button className="selected">Active <b>12</b></button><button>Completed</button><button>Cancelled</button></div><Button variant="secondary"><Search />Find order</Button></div><div className="order-list">{orderRows.map((o, i) => <button key={o[0]} className={cn("order-list-row", selected === i && "row-selected")} onClick={() => setSelected(i)}><div><strong>{o[0]}</strong><Status tone={o[2] === "Swiggy" ? "warning" : o[2] === "Zomato" ? "danger" : "neutral"}>{o[2]}</Status></div><p>{o[1]} · {o[3]}</p><span>{o[4]} · <b>{o[5]}</b> · {o[6]}</span></button>)}</div></section><aside className="detail-pane"><div className="detail-top"><div><small>ORDER {order[0]}</small><h2>{order[1]}</h2></div><Status tone={order[5] === "Ready" ? "success" : "warning"}>{order[5]}</Status></div><div className="order-flow"><span className="done"><Check />Received</span><i /><span className="current"><ChefHat />Preparing</span><i /><span><PackageCheck />Ready</span></div><div className="detail-block"><label>Order items</label><div className="line-item"><b>2 × Chicken Burger</b><span>₹498</span><small>One regular · One without onions</small></div><div className="line-item"><b>1 × French Fries</b><span>₹140</span></div><div className="line-item"><b>2 × Coke</b><span>₹140</span><small>Chilled</small></div></div><div className="detail-block"><label>Payment</label><p className="detail-pair"><span>Paid online</span><b>{order[4]}</b></p><p className="detail-pair"><span>Order source</span><b>{order[2]}</b></p></div><div className="detail-footer"><Button variant="secondary">Report a problem</Button><Button>Mark ready<Check /></Button></div></aside></div>; }

function Kitchen() { const [status, setStatus] = useState<Record<number, string>>({}); const tickets = [
  { id: 1842, place: "TABLE 08", age: "08:42", tone: "safe", items: ["2 × Chicken Burger", "1 × French Fries", "1 × Cappuccino"], note: "1 burger — no onions" },
  { id: 1839, place: "TABLE 12", age: "17:08", tone: "warn", items: ["1 × Paneer Wrap", "1 × Cold Brew"], note: "Wrap — extra spicy" },
  { id: 1836, place: "SWIGGY", age: "22:14", tone: "late", items: ["3 × Chicken Burger", "2 × French Fries", "2 × Coke"], note: "Priority · Rider waiting" },
  { id: 1843, place: "TAKEAWAY", age: "03:21", tone: "safe", items: ["2 × Iced Latte", "1 × Brownie"], note: "Latte — oat milk" },
]; return <div className="kds"><div className="kds-bar"><div><span className="live-dot" />Live · 7 active orders</div><div className="kds-summary"><span><b>11 min</b> avg prep</span><span><b>1</b> late</span><button><ChefHat />All stations<ChevronDown /></button></div></div><div className="ticket-grid">{tickets.map(t => <article className={cn("ticket", `ticket-${t.tone}`)} key={t.id}><header><div><small>ORDER</small><strong>#{t.id}</strong></div><span>{t.place}</span><time><Clock3 />{t.age}</time></header><div className="ticket-items">{t.items.map(item => <p key={item}>{item}</p>)}</div><div className="ticket-note">{t.note}</div><footer>{status[t.id] === "ready" ? <Button variant="success" size="lg"><CheckCircle2 />Ready</Button> : <><Button variant="secondary" onClick={() => setStatus(s => ({...s, [t.id]: "problem"}))}>Problem</Button><Button size="lg" onClick={() => setStatus(s => ({...s, [t.id]: "ready"}))}>Mark ready</Button></>}</footer></article>)}</div></div>; }

const tableData: [string, string, string][] = [
  ["01", "Available", "2 seats"], ["02", "Occupied", "₹680 · 24 min"], ["03", "Preparing", "₹520 · 11 min"], ["04", "Available", "4 seats"], ["05", "Bill requested", "₹1,240 · 46 min"], ["06", "Ordering", "4 guests"], ["07", "Available", "2 seats"], ["08", "Preparing", "₹450 · 8 min"], ["09", "Payment completed", "₹830"], ["10", "Occupied", "₹380 · 6 min"], ["11", "Available", "6 seats"], ["12", "Preparing", "₹472 · 17 min"], ["13", "Available", "2 seats"], ["14", "Occupied", "₹910 · 31 min"],
];
function Tables() { const [selected, setSelected] = useState<string | null>(null); return <div className="tables-page"><div className="table-legend">{["Available", "Occupied", "Ordering", "Preparing", "Bill requested", "Paid"].map((s,i) => <span key={s}><i className={`legend-${i}`} />{s}</span>)}<Button variant="secondary"><Settings />Edit floor plan</Button></div><div className="floor-plan"><div className="floor-label">WINDOW</div>{tableData.map(([num,state,detail], i) => <button onClick={() => setSelected(num)} key={num} className={cn("floor-table", `table-${state.toLowerCase().replace(" ", "-")}`, [1,4,10,13].includes(i) && "table-wide")}><small>TABLE</small><strong>{num}</strong><span>{state === "Available" ? <CheckCircle2 /> : state === "Bill requested" ? <ReceiptText /> : state === "Payment completed" ? <Check /> : <Utensils />}{state}</span><em>{detail}</em></button>)}</div>{selected && <div className="table-drawer"><button className="drawer-close" onClick={() => setSelected(null)}><X /></button><small>TABLE</small><h2>{selected}</h2><Status tone="warning">Preparing · 8 min</Status><div className="drawer-total"><span>Current order</span><b>₹450</b></div>{["View order", "Add items", "Transfer table", "Merge or split", "Request bill"].map((a,i) => <Button key={a} variant={i===0 ? "default" : "secondary"}>{a}<ArrowRight /></Button>)}</div>}</div>; }

const stock: [string, string, string, string, number][] = [
  ["Chicken Breast", "18 kg", "Low", "Tomorrow evening", 22], ["Milk", "42 L", "Healthy", "4 days", 76], ["Coffee Beans", "6 kg", "Low", "Tomorrow morning", 18], ["Burger Buns", "44 pcs", "Watch", "2 days", 38], ["Paneer", "12 kg", "Healthy", "5 days", 68], ["French Fries", "24 kg", "Healthy", "6 days", 84], ["Chocolate", "7 kg", "Healthy", "8 days", 62],
];
function Inventory() { return <div className="page-stack"><section className="inventory-health"><div><span>Inventory health</span><h2>4 items need attention</h2><p>Two ingredients may run out before the weekend.</p></div><div><Metric value="7" label="Running low" /><Metric value="124" label="Healthy" /><Metric value="₹2.8L" label="Stock value" /></div><Button>Review suggested purchase<ArrowRight /></Button></section><div className="filter-row"><div className="segmented"><button className="selected">All ingredients</button><button>Low stock <b>7</b></button><button>Expiring soon <b>2</b></button></div><Button variant="secondary"><Plus />Adjust stock</Button></div><section className="data-card"><div className="data-header"><span>Ingredient</span><span>On hand</span><span>Health</span><span>Expected depletion</span><span /></div>{stock.map(([name,amount,state,depletion,percent]) => <div className="stock-row" key={name}><div><span className="ingredient-icon"><Boxes /></span><b>{name}</b></div><strong>{amount}</strong><div><Status tone={state === "Healthy" ? "success" : state === "Low" ? "danger" : "warning"}>{state}</Status><div className="stock-bar"><i style={{width:`${percent}%`}} /></div></div><span>{depletion}</span><Button variant="ghost" size="icon"><MoreHorizontal /></Button></div>)}</section></div>; }

function Recipes() { const ingredients: [string, string, string][] = [["Chicken breast","120 g","₹38"],["Brioche bun","1 pc","₹16"],["Cheese slice","1 pc","₹10"],["Signature sauce","25 g","₹8"],["Vegetables","40 g","₹10"]]; return <div className="recipe-layout"><aside className="recipe-list"><div className="product-search"><Search /><input placeholder="Search recipes" /></div>{["Chicken Burger","Paneer Wrap","French Fries","Brownie","Cappuccino"].map((r,i)=><button className={i===0?"selected-recipe":""} key={r}><span className={cn("mini-art", `art-${["burger","wrap","fries","brownie","latte"][i] ?? "latte"}`)}>{(products[[4,5,6,7,0][i] ?? 0] ?? products[0])?.icon}</span><span><b>{r}</b><small>{["32.9%","28.4%","21.2%","26.8%","18.6%"][i]} food cost</small></span><ArrowRight /></button>)}</aside><section className="recipe-detail"><div className="recipe-title"><div><span className="eyebrow">Food · Burgers</span><h2>Chicken Burger</h2><p>Updated today by Aisha</p></div><Button variant="secondary">Edit recipe</Button></div><div className="cost-flow"><div><span>Selling price</span><strong>₹249</strong></div><ArrowRight /><div><span>Recipe cost</span><strong>₹82</strong></div><ArrowRight /><div className="highlight-cost"><span>Food cost</span><strong>32.9%</strong></div><ArrowRight /><div><span>Gross margin</span><strong>₹167</strong><small>67.1%</small></div></div><SectionHeading title="Ingredients" action="Add ingredient" /><div className="ingredients-table"><header><span>Ingredient</span><span>Quantity</span><span>Unit cost</span></header>{ingredients.map(i=><div key={i[0]}><b>{i[0]}</b><span>{i[1]}</span><strong>{i[2]}</strong></div>)}</div><div className="cost-insight"><Sparkles /><div><b>Your margin is healthy</b><p>A ₹4 increase in chicken cost would reduce gross margin by 1.6%.</p></div><Button variant="secondary" size="sm">View cost history</Button></div></section></div>; }

function Purchases() { const steps=["Low stock","Suggested purchase","Purchase request","Purchase order","Receive stock","Supplier invoice","Payment"]; return <div className="page-stack"><div className="purchase-flow">{steps.map((s,i)=><div key={s} className={i<2?"flow-active":""}><span>{i<1?<Check />:i+1}</span><b>{s}</b>{i<steps.length-1&&<ArrowRight />}</div>)}</div><div className="two-column"><section><SectionHeading title="Suggested purchases" action="Review all 4" /><div className="data-card">{[["Chicken Breast","Add 25 kg","₹6,250","Fresh Foods Kerala"],["Coffee Beans","Add 12 kg","₹10,800","Malabar Roasters"],["Burger Buns","Add 80 pcs","₹1,280","Bakehouse Kochi"]].map((r,i)=><div className="purchase-row" key={r[0]}><input type="checkbox" defaultChecked={i<2}/><span className="ingredient-icon"><PackageCheck /></span><div><b>{r[0]}</b><small>{r[3]}</small></div><strong>{r[1]}</strong><span>{r[2]}</span></div>)}<div className="purchase-footer"><span>Selected estimate <b>₹17,050</b></span><Button>Create purchase request<ArrowRight /></Button></div></div></section><section><SectionHeading title="Open purchases" /><div className="open-purchases">{[["PO-1048","Fresh Foods Kerala","Arriving today","₹24,680"],["PO-1047","Malabar Roasters","Awaiting invoice","₹18,400"],["PO-1043","Bakehouse Kochi","Payment due tomorrow","₹9,240"]].map((p,i)=><article key={p[0]}><div><small>{p[0]}</small><b>{p[1]}</b></div><Status tone={i===2?"warning":"info"}>{p[2]}</Status><strong>{p[3]}</strong><ArrowRight /></article>)}</div></section></div></div>; }

function Finance() { return <div className="page-stack"><div className="period-bar"><div className="segmented"><button className="selected">Today</button><button>This week</button><button>This month</button></div><Button variant="secondary"><CalendarDays />24 September</Button></div><section className="money-overview"><div className="money-primary"><span>Net profit today</span><strong>₹18,420</strong><p><ArrowUpRight /> 8.2% more than last Thursday</p></div>{[["Sales","₹48,920","184 orders"],["Expenses","₹7,860","12 entries"],["Gross profit","₹29,840","61% margin"]].map(m=><Metric key={m[0]} label={m[0]} value={m[1]} note={m[2]} />)}</section><div className="two-column finance-grid"><section><SectionHeading title="Where your money is" /><div className="money-list">{[[WalletCards,"Cash","₹18,640"],[CreditCard,"Bank & online","₹62,480"],[UserRound,"Customers owe","₹4,200"],[Building2,"You owe suppliers","₹27,640"]].map(([I,l,v])=>{const C=I as Icon; return <div key={l as string}><C/><span>{l as string}</span><b>{v as string}</b><ArrowRight/></div>})}</div></section><section><SectionHeading title="Today’s movement" action="View all" /><div className="transaction-list">{[["UPI settlements","Razorpay · 2:14 PM","+ ₹12,840","in"],["Milk & dairy","Fresh Foods Kerala · 12:20 PM","− ₹3,420","out"],["Cash sales","Morning shift · 11:00 AM","+ ₹8,920","in"],["Delivery commission","Swiggy · 9:40 AM","− ₹1,860","out"]].map(t=><div key={t[0]}><span className={t[3]==="in"?"money-in":"money-out"}>{t[3]==="in"?<ArrowDownRight/>:<ArrowUpRight/>}</span><div><b>{t[0]}</b><small>{t[1]}</small></div><strong>{t[2]}</strong></div>)}</div></section></div></div>; }

function Analytics() { return <div className="page-stack"><div className="analytics-tabs"><button className="active">Overview</button><button>Performance</button><button>Investigation</button><button>Actions</button><span/><Button variant="secondary"><CalendarDays/>Last 7 days</Button></div><section className="analytics-hero"><div><span>Net sales</span><strong>₹3,28,460</strong><p><ArrowUpRight/> 14.2% vs previous 7 days</p></div><Metric label="Orders" value="1,242" note="+9.8%" positive/><Metric label="Avg. order" value="₹264" note="+₹12" positive/><Metric label="Gross margin" value="60.8%" note="−0.6%"/></section><div className="analytics-grid"><section className="analytics-chart"><div className="section-heading"><div><span className="eyebrow">WHAT CHANGED?</span><h2>Sales grew steadily this week</h2></div><Status tone="success">+ ₹40,820</Status></div><div className="line-chart"><svg viewBox="0 0 700 240" preserveAspectRatio="none"><path className="line-fill" d="M0,200 C80,190 90,130 170,145 S290,190 350,110 S480,120 520,75 S630,100 700,38 L700,240 L0,240Z"/><path className="line-main" d="M0,200 C80,190 90,130 170,145 S290,190 350,110 S480,120 520,75 S630,100 700,38"/><path className="line-prev" d="M0,210 C90,170 110,185 180,168 S300,155 360,148 S500,165 540,135 S650,150 700,120"/></svg><div>{["Thu","Fri","Sat","Sun","Mon","Tue","Wed"].map(d=><span key={d}>{d}</span>)}</div></div></section><aside className="insight-panel"><span className="eyebrow">WHY?</span><h2>Cold drinks drove the lift</h2><p>Iced Latte and Cold Brew contributed 42% of this week’s growth, led by afternoons.</p><div className="insight-stat"><span>Iced Latte</span><b>+28%</b></div><div className="insight-stat"><span>Cold Brew</span><b>+19%</b></div><Button>See product performance<ArrowRight/></Button></aside></div></div>; }

function OnlineOrders() { const [accepted,setAccepted]=useState(false); return <div className="page-stack"><div className="channel-grid">{[["CafeOS Direct","Online","18 orders","₹6,840"],["Swiggy","Online","32 orders","₹12,420"],["Zomato","Online","26 orders","₹9,860"]].map((c,i)=><article key={c[0]}><div className={cn("channel-logo",`channel-${i}`)}>{i===0?<Coffee/>:c[0][0]}</div><div><b>{c[0]}</b><Status tone="success">{c[1]}</Status></div><strong>{c[2]}</strong><span>{c[3]} today</span><button><MoreHorizontal/></button></article>)}</div><div className="two-column online-grid"><section><SectionHeading title="Incoming now" /><article className={cn("incoming-order",accepted&&"accepted-order")}><div className="incoming-head"><div className="channel-logo channel-1">S</div><div><span>SWIGGY · NEW ORDER</span><h2>#SW-1824</h2></div><time>00:42</time></div><div className="incoming-items"><p><b>2 ×</b> Chicken Burger</p><p><b>1 ×</b> French Fries</p><p><b>2 ×</b> Coke</p><span>Paid online · ₹778</span></div>{accepted?<div className="accepted-message"><CheckCircle2/><b>Accepted and sent to kitchen</b></div>:<div className="incoming-actions"><Button variant="danger">Reject</Button><Button onClick={()=>setAccepted(true)}>Accept order<Check/></Button></div>}</article></section><section><SectionHeading title="Unified active orders" action="View all 12" /><div className="unified-list">{orderRows.slice(0,4).map((o,i)=><div key={o[0]}><span className={cn("source-dot",`source-${i}`)}/><div><b>{o[0]} · {o[1]}</b><small>{o[3]}</small></div><Status tone={o[5]==="Ready"?"success":"warning"}>{o[5]}</Status><time>{o[6]}</time></div>)}</div></section></div><div className="sync-strip"><CheckCircle2/><div><b>Menus are in sync</b><span>268 items checked across all channels · 2 minutes ago</span></div><Button variant="secondary">Manage channel sync</Button></div></div>; }

function MenuManagement() { const [available,setAvailable]=useState<Record<string,boolean>>({}); return <div className="page-stack"><div className="filter-row"><div className="product-search"><Search/><input placeholder="Search 86 products"/></div><div className="segmented"><button className="selected">Products</button><button>Categories</button><button>Combos</button><button>Modifiers</button></div><Button><Plus/>Add product</Button></div><div className="menu-grid">{products.map(p=><article key={p.name}><div className={cn("product-art",`art-${p.tone}`)}><span>{p.icon}</span><Status tone={available[p.name]===false?"danger":"success"}>{available[p.name]===false?"Unavailable":"Available"}</Status></div><div className="menu-card-body"><div><b>{p.name}</b><span>{p.category}</span></div><strong>₹{p.price}</strong><button onClick={()=>setAvailable(a=>({...a,[p.name]:a[p.name]===false}))} className={cn("switch",available[p.name]!==false&&"switch-on")}><i/></button></div></article>)}</div></div>; }

function Staff() { const people: [string, string, string, string][] = [["AK","Aisha Khan","Manager","In shift · since 8:00 AM"],["RJ","Rahul Joseph","Cashier","In shift · since 9:00 AM"],["FM","Fathima M.","Barista","On break · 12 min"],["AN","Arun Nair","Kitchen lead","In shift · since 8:00 AM"],["SD","Sara D.","Waiter","Shift starts at 4:00 PM"]]; return <div className="page-stack"><section className="staff-summary"><Metric label="Working now" value="9" note="of 14 scheduled"/><Metric label="On break" value="1" note="Back in 18 min"/><Metric label="Late today" value="0" note="Everyone on time" positive/><Metric label="Hours today" value="46.5" note="Across all staff"/></section><div className="filter-row"><div className="segmented"><button className="selected">Today’s team</button><button>Shifts</button><button>Attendance</button><button>Roles & permissions</button></div><Button><Plus/>Add staff</Button></div><div className="staff-table"><header><span>Team member</span><span>Role</span><span>Status</span><span>Today</span><span/></header>{people.map((p,i)=><div key={p[1]}><span className="avatar">{p[0]}</span><b>{p[1]}</b><span>{p[2]}</span><Status tone={i===2?"warning":i===4?"neutral":"success"}>{p[3]}</Status><span>{i===4?"4:00–10:00 PM":"8:00 AM–4:00 PM"}</span><Button variant="ghost" size="icon"><MoreHorizontal/></Button></div>)}</div></div>; }

function Branches() { return <div className="page-stack"><section className="branch-total"><div><span>All branches · Today</span><strong>₹82,460</strong><p><ArrowUpRight/> 10.8% vs yesterday</p></div><Metric label="Total orders" value="312" note="Across 2 branches"/><Metric label="Net profit" value="₹29,640" note="36% of sales"/><Metric label="Alerts" value="6" note="4 in Kochi"/></section><div className="branch-cards">{[["Kochi","Open · closes 11 PM","₹48,920","184","61%","4"],["Dubai","Open · closes 12 AM","AED 1,480","128","64%","2"]].map((b,i)=><article key={b[0]}><header><span className="branch-big-icon"><Store/></span><div><h2>{b[0]}</h2><Status tone="success">{b[1]}</Status></div><Button variant="secondary" size="sm">Open branch<ArrowRight/></Button></header><div><Metric label="Sales today" value={b[2]}/><Metric label="Orders" value={b[3]}/><Metric label="Gross margin" value={b[4]}/></div><footer><AlertTriangle/><span><b>{b[5]} items need attention</b>{i===0?"Chicken and coffee beans are low":"Two staff shifts need review"}</span><ArrowRight/></footer></article>)}</div><section><SectionHeading title="Branch comparison"/><div className="comparison"><div><b>Kochi</b><span>Sales</span><i><em style={{width:"74%"}}/></i><strong>₹48,920</strong></div><div><b>Dubai</b><span>Sales</span><i><em style={{width:"56%"}}/></i><strong>AED 1,480</strong></div></div></section></div>; }

function SettingsView() { return <div className="settings-layout"><aside>{["Business profile","Regional settings","Taxes & invoices","Payments","Order channels","Roles & permissions","Notifications"].map((s,i)=><button className={i===1?"active":""} key={s}>{s}<ArrowRight/></button>)}</aside><section><span className="eyebrow">REGIONAL SETTINGS</span><h2>Location & language</h2><p>Set the defaults for Kochi. Each branch can have its own regional setup.</p><div className="settings-form"><label>Country or region<button><span>🇮🇳</span>India<ChevronDown/></button></label><label>Currency<button><span>₹</span>Indian Rupee (INR)<ChevronDown/></button></label><label>Primary language<button>English<ChevronDown/></button></label><label>Additional language<button>Malayalam<ChevronDown/></button></label><label>Timezone<button>Asia / Kolkata · UTC+5:30<ChevronDown/></button></label><div className="setting-toggle"><div><b>Right-to-left layout</b><p>Automatically adapts CafeOS when Arabic is selected.</p></div><button className="switch"><i/></button></div></div><div className="tax-preview"><div><ReceiptText/></div><span><b>India tax setup</b><p>GST with CGST, SGST and IGST is ready to configure.</p></span><Button variant="secondary">Configure taxes<ArrowRight/></Button></div><footer><Button variant="secondary">Discard changes</Button><Button>Save settings<Check/></Button></footer></section></div>; }