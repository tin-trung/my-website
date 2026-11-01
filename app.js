/**
 * The 30 - Coffee & Tea
 * Frontend Application Logic
 * the30s.id.vn
 */

// --- DỮ LIỆU MẪU MẶC ĐỊNH (Khởi tạo khi chưa có API/Database) ---
const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    name: 'Cà phê Phin Sữa Đá The 30',
    category: 'coffee',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    description: 'Cà phê Robusta Đắk Lắk đậm đà pha phin truyền thống kết hợp sữa đặc ngọt béo thơm lừng.'
  },
  {
    id: 'p2',
    name: 'Cà phê Muối Cố Đô The 30',
    category: 'coffee',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    description: 'Lớp kem muối béo mặn sánh mịn hòa quyện cùng cà phê thơm đậm khó cưỡng.'
  },
  {
    id: 'p3',
    name: 'Bạc Xỉu 3 Tầng Kem Béo',
    category: 'coffee',
    price: 29000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    description: 'Vị ngọt dịu từ sữa tươi nguyên kem, thơm thoang thoảng lớp cà phê phin nhẹ nhàng.'
  },
  {
    id: 'p4',
    name: 'Trà Đào Cam Sả Tươi Mát',
    category: 'tea',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    description: 'Trà đen thơm mát kết hợp đào miếng giòn ngọt, cam vàng mọng nước và hương sả nồng nàn.'
  },
  {
    id: 'p5',
    name: 'Trà Sữa Truyền Thống Trân Châu',
    category: 'tea',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1558857563-b37cfbbf42f5?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    description: 'Vị trà đậm đà chuẩn gu kết hợp trân châu đen dai giòn sần sật nấu với đường đen.'
  },
  {
    id: 'p6',
    name: 'Trà Ô Long Sen Vàng Macchiato',
    category: 'tea',
    price: 39000,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    description: 'Nước cốt trà ô long thanh khiết, hạt sen bùi béo kết hợp lớp milk foam sánh mịn ngọt ngào.'
  },
  {
    id: 'p7',
    name: 'Matcha Đá Xay Kem Tuyết',
    category: 'iceblended',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
    isBestSeller: true,
    description: 'Bột matcha Nhật Bản nguyên chất xay cùng sữa tươi và phủ ngọn kem tuyết mát lạnh.'
  },
  {
    id: 'p8',
    name: 'Cà Phê Cốt Dừa Đá Xay',
    category: 'iceblended',
    price: 40000,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    description: 'Cốt dừa béo ngậy xay đá tuyết thơm lừng, rưới đều dòng cà phê đen nồng nàn.'
  },
  {
    id: 'p9',
    name: 'Bánh Croissant Bơ Tỏi Nướng',
    category: 'snack',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
    isBestSeller: false,
    description: 'Bánh sừng bò Pháp vỏ giòn rụm ngàn lớp, thơm nức sốt bơ tỏi và phô mai nướng.'
  }
];

const DEFAULT_BANNERS = [
  {
    id: 'b1',
    title: 'THE 30 - ĐẬM ĐÀ GU CÀ PHÊ VIỆT',
    subtitle: 'Tặng ngay 1 voucher giảm 20% cho đơn hàng đầu tiên qua website the30s.id.vn',
    badge: 'ƯU ĐÃI KHAI TRƯƠNG',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&auto=format&fit=crop&q=80',
    active: true
  },
  {
    id: 'b2',
    title: 'BỘ SƯU TẬP TRÀ TRÁI CÂY GIẢI NHIỆT',
    subtitle: 'Thanh mát sảng khoái với Trà Đào Cam Sả, Trà Vải Hoa Hồng & Trà Ô Long Sen',
    badge: 'MÓN MỚI MÙA NÀY',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=1600&auto=format&fit=crop&q=80',
    active: true
  }
];

const SETTINGS_SCHEMA_VERSION = '20261101_v10';

const DEFAULT_SETTINGS = {
  storeName: 'The 30 - Coffee & Tea',
  hotline: '0949551441 - 0949789483',
  address: 'Giao nhanh tận nơi / Uống tại quán / Mang đi',
  adminPin: '123456',
  bankCode: 'ICB',
  bankAccount: '100880871374',
  bankAccountName: 'THE30s_COFFEE',
  qrImageUrl: '',
  orderPrefix: 'THE30S',
  settingsVersion: SETTINGS_SCHEMA_VERSION
};

// --- APPLICATION STATE ---
let state = {
  products: [],
  banners: [],
  orders: [],
  settings: { ...DEFAULT_SETTINGS },
  cart: [],
  currentUser: null, // { phone, name }
  myOrderIds: [], // Danh sách mã đơn của riêng khách trên thiết bị này
  dismissedTrackerIds: [],
  currentCategory: 'all',
  currentSort: 'default',
  searchQuery: '',
  bannerIndex: 0,
  bannerTimer: null,
  pendingAddToCartItem: null,
  isAdminLoggedIn: false,
  selectedOrderType: 'takeaway',
  selectedPaymentMethod: 'qr', // 'qr' | 'cash'
  activeAdminTab: 'orders',
  activeOrderFilter: 'active', // Mặc định chỉ hiển thị đơn đang cần xử lý
  orderSearchQuery: '',
  lastPendingCount: 0
};

// URL API Backend PHP
const API_URL = 'api.php';
let isPhpBackendAvailable = null; // Tự động phát hiện khi chạy trực tiếp trên GitHub Pages

// --- ĐỒNG BỘ DỮ LIỆU ĐA NỀN TẢNG / ĐA TRÌNH DUYỆT (CHROME, SAFARI, MOBILE, PC) ---
const CLOUD_SYNC_CONFIG = {
  objectUrl: 'https://api.restful-api.dev/objects/ff808181a09d98f701a196d2a7b87ea1',
  ntfyTopicUrl: 'https://ntfy.sh/the30s_coffee_live_sync_v10',
  clientId: 'client_' + Math.random().toString(36).slice(2, 10)
};

let processedCloudEventIds = new Set();
let localBroadcastChannel = null;
let cloudEventSource = null;

try {
  if (typeof BroadcastChannel !== 'undefined') {
    localBroadcastChannel = new BroadcastChannel('the30_sync_channel_v10');
    localBroadcastChannel.onmessage = (e) => {
      if (e && e.data) {
        applyCloudEvent(e.data, false);
      }
    };
  }
} catch (e) {}

async function pushCloudEvent(eventType, payload = {}) {
  const evt = {
    eventId: 'evt_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
    senderId: CLOUD_SYNC_CONFIG.clientId,
    eventType,
    payload,
    timestamp: Date.now()
  };
  processedCloudEventIds.add(evt.eventId);

  // 1. Đồng bộ tức thì giữa các tab trên cùng máy
  try {
    if (localBroadcastChannel) {
      localBroadcastChannel.postMessage(evt);
    }
  } catch (e) {}

  // 2. Phát sóng thời gian thực (Realtime SSE) sang tất cả các trình duyệt & thiết bị khác qua ntfy.sh
  try {
    fetch(CLOUD_SYNC_CONFIG.ntfyTopicUrl, {
      method: 'POST',
      body: JSON.stringify(evt)
    }).catch(() => {});
  } catch (e) {}

  // 3. Lưu trạng thái tổng thể lên Cloud Object Store để trình duyệt mới mở tải về giống 100%
  try {
    const compactProducts = (state.products || []).map(p => ({
      ...p,
      image: (p.image && p.image.length > 60000) ? DEFAULT_PRODUCTS[0].image : p.image
    }));
    const compactBanners = (state.banners || []).map(b => ({
      ...b,
      image: (b.image && b.image.length > 60000) ? DEFAULT_BANNERS[0].image : b.image
    }));
    const snapshot = {
      name: 'the30s_cloud_store',
      data: {
        schemaVersion: SETTINGS_SCHEMA_VERSION,
        updatedAt: Date.now(),
        products: compactProducts,
        banners: compactBanners,
        settings: state.settings,
        orders: (state.orders || []).slice(0, 60)
      }
    };
    fetch(CLOUD_SYNC_CONFIG.objectUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snapshot)
    }).catch(() => {});
  } catch (e) {}
}

function mergeOrderIntoState(incomingOrder) {
  if (!incomingOrder || !incomingOrder.id) return false;
  const idx = state.orders.findIndex(o => o.id === incomingOrder.id);
  if (idx === -1) {
    state.orders.unshift(incomingOrder);
    return true;
  }
  const current = state.orders[idx];
  const prevStatus = current.status;
  const prevPayment = current.paymentStatus;
  state.orders[idx] = { ...current, ...incomingOrder };
  return (prevStatus !== state.orders[idx].status || prevPayment !== state.orders[idx].paymentStatus);
}

function applyCloudEvent(evt, notifyUI = true) {
  if (!evt || !evt.eventType) return;
  if (evt.eventId && processedCloudEventIds.has(evt.eventId)) return;
  if (evt.eventId) processedCloudEventIds.add(evt.eventId);

  const { eventType, payload } = evt;
  let ordersChanged = false;
  let catalogChanged = false;
  const oldPending = state.orders.filter(o => o.status === 'pending').length;

  if (eventType === 'UPSERT_ORDER' && payload && payload.order) {
    ordersChanged = mergeOrderIntoState(payload.order);
    localStorage.setItem('the30_orders', JSON.stringify(state.orders));
  } else if (eventType === 'DELETE_ORDER' && payload && payload.orderId) {
    const beforeLen = state.orders.length;
    state.orders = state.orders.filter(o => o.id !== payload.orderId);
    if (state.orders.length !== beforeLen) {
      ordersChanged = true;
      localStorage.setItem('the30_orders', JSON.stringify(state.orders));
    }
  } else if (eventType === 'SYNC_PRODUCTS' && payload && Array.isArray(payload.products)) {
    state.products = payload.products;
    localStorage.setItem('the30_products', JSON.stringify(state.products));
    catalogChanged = true;
  } else if (eventType === 'SYNC_BANNERS' && payload && Array.isArray(payload.banners)) {
    state.banners = payload.banners;
    localStorage.setItem('the30_banners', JSON.stringify(state.banners));
    catalogChanged = true;
  } else if (eventType === 'SYNC_SETTINGS' && payload && payload.settings) {
    state.settings = { ...DEFAULT_SETTINGS, ...payload.settings };
    enforceOfficialBankSettings();
    localStorage.setItem('the30_settings', JSON.stringify(state.settings));
    catalogChanged = true;
  }

  if (!notifyUI) {
    renderProducts();
    renderBanners();
    renderCartItems();
    updateCartBadge();
    updateAdminHeaderOrdersCount();
    if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') renderAdminOrders();
    return;
  }

  if (catalogChanged) {
    renderProducts();
    renderBanners();
    if (state.isAdminLoggedIn) {
      renderAdminProducts();
      renderAdminBanners();
      populateSettingsForm();
    }
  }

  if (ordersChanged) {
    const newPending = state.orders.filter(o => o.status === 'pending').length;
    if (state.isAdminLoggedIn && newPending > oldPending) {
      playNewOrderSound();
      showToast(`🔔 Có đơn hàng mới vừa được đặt!`);
    }
    // Nếu khách đang mở QR cho đơn này và đơn vừa chuyển sang đã thanh toán
    if (currentPollingOrderId && payload && payload.order && payload.order.id === currentPollingOrderId && payload.order.paymentStatus === 'paid') {
      onPaymentSuccess(currentPollingOrderId, false);
    }
    renderCartItems();
    updateCartBadge();
    updateAdminHeaderOrdersCount();
    if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') {
      renderAdminOrders();
    }
  }
}

async function pullCloudState(notifyUI = false) {
  // 1. Đọc Snapshot từ Cloud Object Store
  try {
    const res = await fetch(CLOUD_SYNC_CONFIG.objectUrl, { cache: 'no-store' });
    if (res.ok) {
      const obj = await res.json();
      if (obj && obj.data && obj.data.schemaVersion === SETTINGS_SCHEMA_VERSION) {
        const d = obj.data;
        if (Array.isArray(d.products) && d.products.length > 0) {
          state.products = d.products;
          localStorage.setItem('the30_products', JSON.stringify(state.products));
        }
        if (Array.isArray(d.banners) && d.banners.length > 0) {
          state.banners = d.banners;
          localStorage.setItem('the30_banners', JSON.stringify(state.banners));
        }
        if (d.settings) {
          state.settings = { ...DEFAULT_SETTINGS, ...d.settings };
          localStorage.setItem('the30_settings', JSON.stringify(state.settings));
        }
        if (Array.isArray(d.orders)) {
          d.orders.forEach(o => mergeOrderIntoState(o));
          localStorage.setItem('the30_orders', JSON.stringify(state.orders));
        }
      }
    }
  } catch (e) {}

  // 2. Đọc lịch sử sự kiện 12 giờ gần nhất trên ntfy.sh để đảm bảo không sót bất kỳ thay đổi nào
  try {
    const res2 = await fetch(`${CLOUD_SYNC_CONFIG.ntfyTopicUrl}/json?poll=1&since=12h`, { cache: 'no-store' });
    if (res2.ok) {
      const text = await res2.text();
      const lines = text.trim().split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const wrapper = JSON.parse(line);
          if (wrapper && wrapper.event === 'message' && wrapper.message) {
            const innerEvt = JSON.parse(wrapper.message);
            applyCloudEvent(innerEvt, notifyUI);
          }
        } catch (errLine) {}
      }
    }
  } catch (e2) {}
}

function startRealtimeCloudStream() {
  try {
    if (typeof EventSource === 'undefined') return;
    if (cloudEventSource) {
      cloudEventSource.close();
    }
    cloudEventSource = new EventSource(`${CLOUD_SYNC_CONFIG.ntfyTopicUrl}/sse`);
    cloudEventSource.onmessage = (e) => {
      if (!e || !e.data) return;
      try {
        const wrapper = JSON.parse(e.data);
        if (wrapper && wrapper.event === 'message' && wrapper.message) {
          const innerEvt = JSON.parse(wrapper.message);
          applyCloudEvent(innerEvt, true);
        }
      } catch (err) {}
    };
  } catch (e) {}
}

// --- CẤU HÌNH KẾT NỐI TRỰC TIẾP APIPAY (CHẠY NGAY TRÊN GITHUB PAGES) ---
const APIPAY_LIVE_CONFIG = {
  baseUrl: 'https://app.apipay.vn/v1',
  accessKey: '89c1dddbdf3378cbf20e319b3f6111847a7c251f173900f9866a5a791ac3260c',
  secretKey: '59h4pFKdXKV5AFam3nikR0OYVX/ewcOzkuxIm9ZPLnBZUN2uzEM0F4KzPT15NtkPslLHhTubfyfGtB3m+XDvQA==',
  bankPublicId: 'cmvxjzmx504zt01mtsg7gr1by',
  ignoredPublicIds: ['APIPAYJSCBNE1DC0WJU', 'APIPAYJSCJNYBNGA97U']
};

function getApiPayBearerToken() {
  return btoa(`${APIPAY_LIVE_CONFIG.accessKey}:${APIPAY_LIVE_CONFIG.secretKey}`);
}

function getOrderTransferContent(orderId) {
  const cleanCode = String(orderId || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
  return `THE30 ${cleanCode}`;
}

async function callApiPayDirect(endpointPath, method = 'GET', bodyObj = null) {
  const targetUrl = `${APIPAY_LIVE_CONFIG.baseUrl}${endpointPath}`;
  const proxyUrl = `https://proxy.corsfix.com/?sdk=1&url=${encodeURIComponent(targetUrl)}`;

  const headers = {
    'Authorization': `Bearer ${getApiPayBearerToken()}`,
    'x-corsfix-headers': JSON.stringify({ origin: 'https://pay.apipay.vn' })
  };
  if (bodyObj) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(proxyUrl, {
      method,
      headers,
      body: bodyObj ? JSON.stringify(bodyObj) : undefined
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Fallback sang cổng dự phòng AllOrigins nếu là GET công khai
  }

  if (method === 'GET' && endpointPath.startsWith('/payment-requests/')) {
    try {
      const sep = targetUrl.includes('?') ? '&' : '?';
      const fallbackUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl + sep + '_t=' + Date.now())}`;
      const res2 = await fetch(fallbackUrl);
      if (res2.ok) {
        const wrapper = await res2.json();
        if (wrapper && wrapper.contents) {
          return JSON.parse(wrapper.contents);
        }
      }
    } catch (e2) {}
  }

  return null;
}

async function createApiPayPaymentDirect(orderData) {
  if (!orderData || !orderData.id) return null;
  if (orderData.apipayPublicId && orderData.apipayQrUrl) {
    return {
      publicId: orderData.apipayPublicId,
      qrUrl: orderData.apipayQrUrl,
      payUrl: orderData.apipayPayUrl
    };
  }

  const transferContent = getOrderTransferContent(orderData.id);
  const typeText = orderData.orderType === 'dinein'
    ? `Ban: ${orderData.address || ''}`
    : orderData.orderType === 'delivery'
      ? `Giao: ${orderData.address || ''}`
      : `Mang di${orderData.address ? ': ' + orderData.address : ''}`;
  const itemsSummary = (orderData.items || [])
    .map(i => `${i.quantity}x ${i.name}${i.note ? ' (' + i.note + ')' : ''}`)
    .join(', ');
  // ApiPay yêu cầu title <= 200 ký tự
  const compactTitle = `${orderData.id} | ${orderData.customerName || 'Khach'} (${orderData.customerPhone || ''}) | ${typeText} | ${itemsSummary}`.slice(0, 190);

  const payload = {
    bankPublicId: APIPAY_LIVE_CONFIG.bankPublicId,
    amount: String(Math.max(1000, Math.round(Number(orderData.totalAmount) || 0))),
    content: transferContent,
    title: compactTitle
  };

  const result = await callApiPayDirect('/client/payment-requests', 'POST', payload);
  if (result && result.data && result.data.publicId) {
    const d = result.data;
    orderData.apipayPublicId = d.publicId;
    orderData.apipayQrUrl = '';
    orderData.apipayPayUrl = d.payUrl || `https://pay.apipay.vn/${d.publicId}`;
    if (d.content) {
      orderData.transferContent = d.content;
    } else {
      orderData.transferContent = transferContent;
    }
    localStorage.setItem('the30_orders', JSON.stringify(state.orders));
    pushCloudEvent('UPSERT_ORDER', { order: orderData });
    return {
      publicId: orderData.apipayPublicId,
      content: orderData.transferContent,
      payUrl: orderData.apipayPayUrl
    };
  }
  return null;
}

function isApiPayStatusPaid(statusVal) {
  if (!statusVal) return false;
  const st = String(statusVal).toUpperCase();
  return ['COMPLETED', 'PAID', 'SUCCESS', 'SUCCEEDED', 'DONE'].includes(st);
}

async function checkApiPayOrderDirect(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (order && !order.apipayPublicId) {
    await createApiPayPaymentDirect(order);
  }

  const apipayPid = order && order.apipayPublicId ? order.apipayPublicId : '';
  const cleanOrderCode = String(orderId || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();

  // 1. Kiểm tra trực tiếp mã Payment Request của đơn hàng trên ApiPay
  if (apipayPid) {
    const res = await callApiPayDirect(`/payment-requests/${encodeURIComponent(apipayPid)}`, 'GET');
    if (res && res.data) {
      const pData = res.data;
      if (isApiPayStatusPaid(pData.status) || pData.paidAt || pData.completedAt) {
        return true;
      }
    }
  }

  // 2. Đối chiếu danh sách Payment Requests mới nhất trên tài khoản ApiPay
  const listRes = await callApiPayDirect('/client/payment-requests?page=1&limit=20', 'GET');
  if (listRes && listRes.data && Array.isArray(listRes.data.data)) {
    for (const item of listRes.data.data) {
      if (APIPAY_LIVE_CONFIG.ignoredPublicIds.includes(item.publicId)) continue;
      const itemContentClean = String(item.content || '').replace(/[^A-Z0-9]/gi, '').toUpperCase();
      const itemTitle = String(item.title || '');
      const isMatch =
        (apipayPid && item.publicId === apipayPid) ||
        (orderId && itemTitle.includes(orderId)) ||
        (cleanOrderCode && itemContentClean.includes(cleanOrderCode));

      if (isMatch && isApiPayStatusPaid(item.status)) {
        return true;
      }
    }
  }

  return false;
}

async function syncOrdersFromApiPay() {
  try {
    // Nếu khách có đơn chưa thanh toán hoặc Admin đang mở trang quản lý, đồng bộ từ ApiPay
    const hasUnpaidMyOrder = state.orders.some(
      o => o.paymentStatus !== 'paid' && o.status !== 'cancelled' && o.status !== 'completed'
    );
    if (!state.isAdminLoggedIn && !hasUnpaidMyOrder) return;

    const listRes = await callApiPayDirect('/client/payment-requests?page=1&limit=25', 'GET');
    if (!listRes || !listRes.data || !Array.isArray(listRes.data.data)) return;

    let changed = false;
    const oldPending = state.orders.filter(o => o.status === 'pending').length;

    for (const pr of listRes.data.data) {
      if (!pr || !pr.publicId || APIPAY_LIVE_CONFIG.ignoredPublicIds.includes(pr.publicId)) continue;

      const titleStr = String(pr.title || '');
      const idMatch = titleStr.match(/^(ORD-[0-9]+)/i);
      const extractedOrderId = idMatch ? idMatch[1].toUpperCase() : null;

      let existing = state.orders.find(
        o => o.apipayPublicId === pr.publicId || (extractedOrderId && o.id === extractedOrderId)
      );

      // Nếu Admin đang đăng nhập và có đơn mới từ máy khách khác gửi lên ApiPay
      if (!existing && state.isAdminLoggedIn && extractedOrderId) {
        const parts = titleStr.split(' | ');
        const custPart = parts[1] || 'Khách hàng';
        const locPart = parts[2] || 'Mang đi';
        const itemsPart = parts[3] || 'Đơn hàng trên web';
        const phoneMatch = custPart.match(/\(([0-9+]+)\)/);
        const custPhone = phoneMatch ? phoneMatch[1] : '';
        const custName = custPart.replace(/\s*\([0-9+]+\)/, '').trim() || 'Khách hàng';
        const orderType = locPart.startsWith('Ban:') ? 'dinein' : locPart.startsWith('Giao:') ? 'delivery' : 'takeaway';
        const addressVal = locPart.replace(/^(Ban:|Giao:|Mang di:?)\s*/i, '').trim();

        existing = {
          id: extractedOrderId,
          customerPhone: custPhone,
          customerName: custName,
          orderType: orderType,
          address: addressVal,
          note: addressVal,
          items: [{ id: 'apipay', name: itemsPart, price: Number(pr.amount) || 0, quantity: 1, note: '' }],
          totalAmount: Number(pr.amount) || 0,
          status: isApiPayStatusPaid(pr.status) ? 'preparing' : 'pending',
          paymentStatus: isApiPayStatusPaid(pr.status) ? 'paid' : 'unpaid',
          apipayPublicId: pr.publicId,
          apipayQrUrl: pr.qrUrl || '',
          apipayPayUrl: pr.payUrl || '',
          createdAt: pr.createdAt || new Date().toISOString()
        };
        state.orders.unshift(existing);
        changed = true;
      }

      if (existing && isApiPayStatusPaid(pr.status) && existing.paymentStatus !== 'paid') {
        existing.paymentStatus = 'paid';
        if (existing.status === 'pending') {
          existing.status = 'preparing';
        }
        changed = true;
        if (currentPollingOrderId === existing.id) {
          onPaymentSuccess(existing.id, false);
        } else {
          playTingTingSound();
          showToast(`Ting ting! Đơn hàng ${existing.id} đã thanh toán thành công!`);
        }
      }
    }

    if (changed) {
      localStorage.setItem('the30_orders', JSON.stringify(state.orders));
      const newPending = state.orders.filter(o => o.status === 'pending').length;
      if (state.isAdminLoggedIn && newPending > oldPending) {
        playNewOrderSound();
        showToast(`🔔 Có ${newPending - oldPending} đơn hàng mới vừa được đặt!`);
      }
      renderCustomerOrderTracker();
      updateAdminHeaderOrdersCount();
      if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') {
        renderAdminOrders();
      }
    }
  } catch (e) {}
}

// Hàm ép buộc nâng cấp tài khoản VietinBank chính thức & đồng bộ dữ liệu trên mọi trình duyệt (Chrome, Safari, Edge...)
function enforceOfficialBankSettings() {
  const savedSchemaVer = localStorage.getItem('the30_schema_version');
  if (savedSchemaVer !== SETTINGS_SCHEMA_VERSION) {
    localStorage.setItem('the30_schema_version', SETTINGS_SCHEMA_VERSION);
    state.products = [...DEFAULT_PRODUCTS];
    state.banners = [...DEFAULT_BANNERS];
    localStorage.setItem('the30_products', JSON.stringify(state.products));
    localStorage.setItem('the30_banners', JSON.stringify(state.banners));
  }

  if (
    !state.settings ||
    state.settings.settingsVersion !== SETTINGS_SCHEMA_VERSION ||
    !state.settings.bankAccount ||
    state.settings.bankAccount === '0949551441' ||
    state.settings.bankCode === 'MB'
  ) {
    state.settings = {
      ...DEFAULT_SETTINGS,
      ...(state.settings || {}),
      bankCode: 'ICB',
      bankAccount: '100880871374',
      bankAccountName: 'THE30s_COFFEE',
      qrImageUrl: '',
      settingsVersion: SETTINGS_SCHEMA_VERSION
    };
    localStorage.setItem('the30_settings', JSON.stringify(state.settings));
  }
}

// Âm thanh chuông báo có đơn hàng mới (Web Audio API không cần file ngoài)
function playNewOrderSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (e) {}
}

// --- TIỆN ÍCH ĐỊNH DẠNG ---
function formatPrice(number) {
  return new Intl.NumberFormat('vi-VN').format(number) + ' đ';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' ' +
         d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  const iconEl = document.getElementById('toastIcon');
  if (!toast || !msgEl || !iconEl) return;

  msgEl.textContent = message;
  if (type === 'success') {
    iconEl.className = 'fa-solid fa-circle-check text-emerald-400 text-base';
  } else if (type === 'error') {
    iconEl.className = 'fa-solid fa-circle-exclamation text-rose-400 text-base';
  } else {
    iconEl.className = 'fa-solid fa-bell text-amber-400 text-base';
  }

  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-24', 'opacity-0');
  }, 2800);
}

// --- KHỞI TẠO VÀ ĐỒNG BỘ DỮ LIỆU ---
async function initApp() {
  // 1. Phục hồi session người dùng, giỏ hàng và danh sách mã đơn của khách từ localStorage
  const savedUser = localStorage.getItem('the30_user');
  if (savedUser) {
    try {
      state.currentUser = JSON.parse(savedUser);
    } catch (e) {
      state.currentUser = null;
    }
  }

  const savedCart = localStorage.getItem('the30_cart');
  if (savedCart) {
    try {
      state.cart = JSON.parse(savedCart);
    } catch (e) {
      state.cart = [];
    }
  }

  const savedMyOrders = localStorage.getItem('the30_my_order_ids');
  if (savedMyOrders) {
    try {
      state.myOrderIds = JSON.parse(savedMyOrders);
    } catch (e) {
      state.myOrderIds = [];
    }
  }

  // 2. Tải dữ liệu từ API / Cloud Sync hoặc fallback LocalStorage
  await loadData();

  // 3. Render giao diện ban đầu
  renderUserHeader();
  renderBanners();
  renderProducts();
  updateCartBadge();
  renderCartItems();
  startBannerCarousel();
  updateAdminHeaderOrdersCount();

  // 4. Mở kênh lắng nghe thời gian thực đa nền tảng (SSE + Polling)
  startRealtimeCloudStream();
  setInterval(() => {
    loadDataSilently();
  }, 5000);
}

async function loadData() {
  if (isPhpBackendAvailable !== false) {
    try {
      const res = await fetch(`${API_URL}?action=get_all`, { method: 'GET' });
      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data.success) {
          isPhpBackendAvailable = true;
          state.products = data.products || DEFAULT_PRODUCTS;
          state.banners  = data.banners  || DEFAULT_BANNERS;
          state.settings = { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
          state.orders   = data.orders   || [];
          
          enforceOfficialBankSettings();

          // Cache lại vào LocalStorage phòng khi offline
          localStorage.setItem('the30_products', JSON.stringify(state.products));
          localStorage.setItem('the30_banners', JSON.stringify(state.banners));
          localStorage.setItem('the30_settings', JSON.stringify(state.settings));
          localStorage.setItem('the30_orders', JSON.stringify(state.orders));
          return;
        }
      } else {
        isPhpBackendAvailable = false;
      }
    } catch (err) {
      isPhpBackendAvailable = false;
    }
  }

  // Fallback đọc LocalStorage + Cloud Sync (chế độ chạy trực tiếp trên GitHub Pages)
  const cachedProducts = localStorage.getItem('the30_products');
  const cachedBanners  = localStorage.getItem('the30_banners');
  const cachedSettings = localStorage.getItem('the30_settings');
  const cachedOrders   = localStorage.getItem('the30_orders');

  state.products = cachedProducts ? JSON.parse(cachedProducts) : DEFAULT_PRODUCTS;
  state.banners  = cachedBanners  ? JSON.parse(cachedBanners)  : DEFAULT_BANNERS;
  state.settings = cachedSettings ? JSON.parse(cachedSettings) : { ...DEFAULT_SETTINGS };
  state.orders   = cachedOrders   ? JSON.parse(cachedOrders)   : [];

  enforceOfficialBankSettings();
  await pullCloudState(false);
  await syncOrdersFromApiPay();
}

async function loadDataSilently() {
  if (isPhpBackendAvailable === true) {
    try {
      const res = await fetch(`${API_URL}?action=get_all`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success) {
          const oldPending = state.orders.filter(o => o.status === 'pending').length;
          state.orders = data.orders || [];
          localStorage.setItem('the30_orders', JSON.stringify(state.orders));
          const newPending = state.orders.filter(o => o.status === 'pending').length;

          // CHỈ reo chuông báo đơn mới khi đang đăng nhập quyền Quản trị Admin
          if (state.isAdminLoggedIn && newPending > oldPending) {
            playNewOrderSound();
            showToast(`🔔 Có ${newPending - oldPending} đơn hàng mới vừa được đặt!`);
          }

          renderCartItems();
          updateCartBadge();
          updateAdminHeaderOrdersCount();
          if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') {
            renderAdminOrders();
          }
          return;
        }
      }
    } catch (e) {}
  }

  // Đồng bộ từ Cloud + ApiPay (GitHub Pages)
  try {
    await pullCloudState(true);
    await syncOrdersFromApiPay();
    renderCartItems();
    updateCartBadge();
    updateAdminHeaderOrdersCount();
    if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') {
      renderAdminOrders();
    }
  } catch (err) {}
}

async function refreshData() {
  await loadData();
  renderProducts();
  renderBanners();
  renderCartItems();
  updateCartBadge();
  updateAdminHeaderOrdersCount();
  renderAdminOrders();
  renderAdminProducts();
  renderAdminBanners();
  populateSettingsForm();
  showToast('Đã đồng bộ và làm mới dữ liệu trên mọi thiết bị!');
}

// --- HEADER & XÁC THỰC NGƯỜI DÙNG BẰNG SĐT ---
function renderUserHeader() {
  const container = document.getElementById('userHeaderSection');
  if (!container) return;

  if (state.currentUser && state.currentUser.phone) {
    container.innerHTML = `
      <div class="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full border border-slate-200 transition">
        <div class="w-6 h-6 rounded-full bg-brand-900 text-amber-300 font-bold text-xs flex items-center justify-center">
          ${state.currentUser.name ? state.currentUser.name.charAt(0).toUpperCase() : 'K'}
        </div>
        <div class="text-left hidden sm:block">
          <p class="text-xs font-bold text-slate-800 leading-tight">${state.currentUser.name}</p>
          <p class="text-[10px] text-slate-500 font-mono leading-tight">${state.currentUser.phone}</p>
        </div>
        <button onclick="handleLogout()" title="Đăng xuất" class="text-slate-400 hover:text-rose-500 ml-1 text-xs">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="openLoginModal()" class="text-slate-700 hover:text-brand-900 font-semibold text-xs sm:text-sm px-3 py-2 rounded-full hover:bg-slate-100 transition flex items-center gap-1.5">
        <i class="fa-regular fa-user text-brand-900"></i>
        <span>Đăng nhập</span>
      </button>
    `;
  }
}

function openLoginModal(pendingItem = null) {
  state.pendingAddToCartItem = pendingItem;
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('loginPhoneInput').focus();
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
  state.pendingAddToCartItem = null;
}

function handlePhoneLogin(e) {
  e.preventDefault();
  const phone = document.getElementById('loginPhoneInput').value.trim();
  const name = document.getElementById('loginNameInput').value.trim();

  if (!phone || !name) {
    alert('Vui lòng nhập đầy đủ Số điện thoại và Tên của bạn.');
    return;
  }

  state.currentUser = { phone, name };
  localStorage.setItem('the30_user', JSON.stringify(state.currentUser));

  renderUserHeader();
  closeLoginModal();
  showToast(`Xin chào ${name}! Đăng nhập thành công.`);

  // Nếu người dùng trước đó đang bấm thêm một món vào giỏ -> tiếp tục thêm
  if (state.pendingAddToCartItem) {
    addItemToCartDirectly(state.pendingAddToCartItem);
    state.pendingAddToCartItem = null;
  }
}

function handleLogout() {
  if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    state.currentUser = null;
    localStorage.removeItem('the30_user');
    renderUserHeader();
    showToast('Đã đăng xuất tài khoản.');
  }
}

// --- BANNER QUẢNG CÁO CAROUSEL ---
function renderBanners() {
  const container = document.getElementById('bannerCarousel');
  const dotsContainer = document.getElementById('bannerDots');
  if (!container || !dotsContainer) return;

  const activeBanners = state.banners.filter(b => b.active !== false);
  if (activeBanners.length === 0) {
    container.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-brand-950 text-white p-6 text-center">
        <div>
          <h2 class="text-2xl font-black text-amber-400">The 30 - Coffee & Tea</h2>
          <p class="text-sm text-slate-300 mt-2">Chào mừng bạn đến với the30s.id.vn</p>
        </div>
      </div>
    `;
    dotsContainer.innerHTML = '';
    return;
  }

  container.innerHTML = activeBanners.map((b, idx) => `
    <div class="banner-slide absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === state.bannerIndex ? 'opacity-100 z-1' : 'opacity-0 pointer-events-none'}" style="background-image: url('${b.image}'); background-size: cover; background-position: center;">
      <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-transparent flex items-end md:items-center p-5 sm:p-10 md:p-14">
        <div class="max-w-xl text-white space-y-2 sm:space-y-3">
          ${b.badge ? `
            <span class="inline-block bg-amber-400 text-brand-950 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
              ${b.badge}
            </span>
          ` : ''}
          <h3 class="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            ${b.title}
          </h3>
          ${b.subtitle ? `
            <p class="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 leading-relaxed drop-shadow">
              ${b.subtitle}
            </p>
          ` : ''}
          <div class="pt-1">
            <button onclick="document.getElementById('productsGrid').scrollIntoView({behavior: 'smooth'})" class="bg-amber-400 hover:bg-amber-300 text-brand-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg transition active:scale-95 inline-flex items-center gap-2">
              <span>Khám phá menu ngay</span>
              <i class="fa-solid fa-arrow-down text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  dotsContainer.innerHTML = activeBanners.map((_, idx) => `
    <button onclick="goToBanner(${idx})" class="w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === state.bannerIndex ? 'bg-amber-400 w-7' : 'bg-white/50 hover:bg-white'}"></button>
  `).join('');
}

function startBannerCarousel() {
  if (state.bannerTimer) clearInterval(state.bannerTimer);
  state.bannerTimer = setInterval(() => {
    nextBanner();
  }, 5000);
}

function nextBanner() {
  const activeBanners = state.banners.filter(b => b.active !== false);
  if (activeBanners.length <= 1) return;
  state.bannerIndex = (state.bannerIndex + 1) % activeBanners.length;
  renderBanners();
}

function prevBanner() {
  const activeBanners = state.banners.filter(b => b.active !== false);
  if (activeBanners.length <= 1) return;
  state.bannerIndex = (state.bannerIndex - 1 + activeBanners.length) % activeBanners.length;
  renderBanners();
}

function goToBanner(index) {
  state.bannerIndex = index;
  renderBanners();
  startBannerCarousel();
}

// --- THỰC ĐƠN & BỘ LỌC SẢN PHẨM ---
function filterCategory(cat) {
  state.currentCategory = cat;
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.classList.remove('tab-active');
  });
  const activeBtn = document.getElementById(`catBtn-${cat}`);
  if (activeBtn) activeBtn.classList.add('tab-active');
  renderProducts();
}

function handleSort(sortVal) {
  state.currentSort = sortVal;
  renderProducts();
}

function handleSearch(query) {
  state.searchQuery = query.trim().toLowerCase();
  renderProducts();
}

function resetFilters() {
  state.currentCategory = 'all';
  state.currentSort = 'default';
  state.searchQuery = '';
  document.getElementById('searchInputDesktop').value = '';
  document.getElementById('searchInputMobile').value = '';
  document.getElementById('sortSelect').value = 'default';
  filterCategory('all');
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noFound = document.getElementById('noProductsFound');
  const badge = document.getElementById('productCountBadge');
  if (!grid) return;

  let list = [...state.products];

  // 1. Lọc theo danh mục
  if (state.currentCategory !== 'all') {
    list = list.filter(p => p.category === state.currentCategory);
  }

  // 2. Lọc theo từ khóa tìm kiếm
  if (state.searchQuery) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(state.searchQuery) ||
      (p.description && p.description.toLowerCase().includes(state.searchQuery))
    );
  }

  // 3. Sắp xếp
  if (state.currentSort === 'bestseller') {
    list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  } else if (state.currentSort === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.currentSort === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.currentSort === 'name_asc') {
    list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  }

  badge.textContent = `${list.length} món`;

  if (list.length === 0) {
    grid.innerHTML = '';
    noFound.classList.remove('hidden');
    return;
  }

  noFound.classList.add('hidden');
  grid.innerHTML = list.map(item => `
    <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      <!-- Ảnh món -->
      <div class="relative w-full aspect-square overflow-hidden bg-slate-100">
        <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        
        ${item.isBestSeller ? `
          <div class="absolute top-2.5 left-2.5 badge-bestseller text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
            <i class="fa-solid fa-fire text-amber-200"></i> Best Seller
          </div>
        ` : ''}

        <!-- Nút thêm nhanh tròn ở góc trên mobile -->
        <button onclick="handleAddToCartClick('${item.id}')" title="Thêm vào giỏ" class="sm:hidden absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center shadow-lg active:scale-90 transition">
          <i class="fa-solid fa-plus text-xs"></i>
        </button>
      </div>

      <!-- Thông tin món -->
      <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span class="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            ${getCategoryName(item.category)}
          </span>
          <h3 class="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 group-hover:text-brand-900 transition mt-0.5">
            ${item.name}
          </h3>
          <p class="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
            ${item.description || 'Hương vị tươi ngon, nguyên liệu tuyển chọn từ The 30.'}
          </p>
        </div>

        <!-- Giá & Nút thêm vào giỏ -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-sm sm:text-base font-extrabold text-brand-900">
            ${formatPrice(item.price)}
          </span>
          <button onclick="handleAddToCartClick('${item.id}')" class="hidden sm:inline-flex bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold px-3 py-1.5 rounded-full items-center gap-1 shadow-sm transition active:scale-95">
            <i class="fa-solid fa-plus text-[10px]"></i> Thêm
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getCategoryName(catKey) {
  switch (catKey) {
    case 'coffee': return 'Cà phê';
    case 'tea': return 'Trà & Trà sữa';
    case 'iceblended': return 'Đá xay';
    case 'snack': return 'Bánh & Ăn vặt';
    default: return 'Món ngon';
  }
}

// --- QUẢN LÝ GIỎ HÀNG VÀ CHÚ THÍCH TỪNG MÓN ---

// Yêu cầu: "khi thêm sản phẩm vào giỏ hàng mới cần đăng nhập"
function handleAddToCartClick(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  // Nếu người dùng CHƯA đăng nhập bằng số điện thoại
  if (!state.currentUser || !state.currentUser.phone) {
    // Mở popup đăng nhập và giữ lại món đang chọn
    openLoginModal(product);
    return;
  }

  // Đã đăng nhập -> Thêm trực tiếp vào giỏ
  addItemToCartDirectly(product);
}

function addItemToCartDirectly(product) {
  const existingIndex = state.cart.findIndex(i => i.id === product.id && (!i.note || i.note === ''));
  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      note: '' // Chú thích riêng cho từng món: ít đá, ít đường, v.v.
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function saveCart() {
  localStorage.setItem('the30_cart', JSON.stringify(state.cart));
}

function getMyPurchasedOrders() {
  return state.orders.filter(o => {
    const isMyDeviceOrder = Array.isArray(state.myOrderIds) && state.myOrderIds.includes(o.id);
    const isMyPhoneOrder = state.currentUser && state.currentUser.phone && o.customerPhone === state.currentUser.phone;
    return isMyDeviceOrder || isMyPhoneOrder;
  });
}

function updateCartBadge() {
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const activeMyOrdersCount = getMyPurchasedOrders().filter(
    o => ['pending', 'preparing', 'shipping'].includes(o.status)
  ).length;
  const badge = document.getElementById('headerCartCount');
  if (badge) {
    badge.textContent = cartItemCount > 0 ? cartItemCount : activeMyOrdersCount;
  }
}

function openCartDrawer() {
  renderCartItems();
  document.getElementById('cartDrawer').classList.remove('hidden');
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.add('hidden');
}

function renderCartItems() {
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('cartTotalPrice');
  const checkoutSection = document.getElementById('cartCheckoutSection');
  const currentBadge = document.getElementById('cartCurrentItemsBadge');

  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (currentBadge) {
    currentBadge.textContent = `${cartItemCount} món`;
  }

  if (container && totalEl) {
    if (state.cart.length === 0) {
      if (checkoutSection) checkoutSection.classList.add('hidden');
      container.innerHTML = `
        <div class="py-6 text-center text-slate-400 space-y-2 bg-slate-50/80 rounded-xl border border-dashed border-slate-200">
          <i class="fa-solid fa-basket-shopping text-2xl text-slate-300"></i>
          <p class="text-xs font-medium text-slate-500">Chưa có món mới đang chọn trong giỏ</p>
          <button onclick="closeCartDrawer()" class="text-[11px] font-bold text-brand-900 bg-brand-100/70 px-3 py-1 rounded-full hover:bg-brand-100 transition">
            + Chọn thêm món từ thực đơn
          </button>
        </div>
      `;
      totalEl.textContent = '0 đ';
    } else {
      if (checkoutSection) checkoutSection.classList.remove('hidden');
      let total = 0;
      container.innerHTML = state.cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
          <div class="pt-3 first:pt-0 space-y-2">
            <div class="flex items-start gap-3">
              <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-xl border border-slate-200 flex-shrink-0">
              <div class="flex-1 min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate">${item.name}</h4>
                <p class="text-xs font-extrabold text-brand-900">${formatPrice(item.price)}</p>
              </div>
              <!-- Bộ nút tăng giảm số lượng -->
              <div class="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 border border-slate-200">
                <button onclick="changeCartQuantity(${index}, -1)" class="w-6 h-6 rounded bg-white text-slate-700 flex items-center justify-center text-xs hover:bg-slate-200 font-bold">
                  -
                </button>
                <span class="w-6 text-center text-xs font-bold text-slate-900">${item.quantity}</span>
                <button onclick="changeCartQuantity(${index}, 1)" class="w-6 h-6 rounded bg-brand-900 text-white flex items-center justify-center text-xs hover:bg-brand-800 font-bold">
                  +
                </button>
              </div>
            </div>

            <!-- Chú thích từng sản phẩm -->
            <div class="relative pl-1">
              <div class="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                <span class="font-semibold">Chú thích riêng cho món này:</span>
              </div>
              <input type="text" value="${item.note || ''}" onchange="updateItemNote(${index}, this.value)" placeholder="Ví dụ: 50% đường, ít đá, thêm trân châu..." class="w-full text-xs p-1.5 bg-amber-50/60 border border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 text-slate-800 placeholder-slate-400">
            </div>
          </div>
        `;
      }).join('');

      totalEl.textContent = formatPrice(total);
    }
  }

  renderCartOrderHistory();
}

function changeCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function updateItemNote(index, noteVal) {
  if (state.cart[index]) {
    state.cart[index].note = noteVal.trim();
    saveCart();
  }
}

function selectOrderType(type) {
  state.selectedOrderType = type;
  document.querySelectorAll('.order-type-btn').forEach(btn => {
    btn.classList.remove('bg-brand-900', 'text-white', 'border-brand-900');
    btn.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
  });

  const activeBtn = document.getElementById(`btnOrderType-${type}`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
    activeBtn.classList.add('bg-brand-900', 'text-white', 'border-brand-900');
  }

  const labelEl = document.getElementById('orderLocationLabel');
  const inputEl = document.getElementById('orderLocationInput');
  if (type === 'dinein') {
    labelEl.textContent = 'Số bàn của bạn *:';
    inputEl.placeholder = 'Ví dụ: Bàn số 05 (tầng 1)';
  } else if (type === 'delivery') {
    labelEl.textContent = 'Địa chỉ nhận hàng *:';
    inputEl.placeholder = 'Số nhà, tên đường, phường/xã để giao tận nơi';
  } else {
    labelEl.textContent = 'Ghi chú cho quán (Mang đi):';
    inputEl.placeholder = 'Ví dụ: Lấy ly giấy, mang đi ngay';
  }
}

function selectPaymentMethod(method) {
  state.selectedPaymentMethod = method === 'cash' ? 'cash' : 'qr';
  document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.classList.remove('border-brand-900', 'bg-brand-900', 'text-white', 'shadow-sm');
    btn.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
  });

  const activeBtn = document.getElementById(`btnPaymentMethod-${state.selectedPaymentMethod}`);
  if (activeBtn) {
    activeBtn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
    activeBtn.classList.add('border-brand-900', 'bg-brand-900', 'text-white', 'shadow-sm');
  }

  const submitTextEl = document.getElementById('btnProceedOrderText');
  if (submitTextEl) {
    submitTextEl.textContent = state.selectedPaymentMethod === 'cash'
      ? 'Đặt hàng ngay (Thanh toán tiền mặt)'
      : 'Đặt hàng & Quét mã QR';
  }
}

// Chuyển về trang thực đơn khách hàng khi bấm vào Logo
function switchCustomerTab(tab = 'menu') {
  const adminView = document.getElementById('adminView');
  if (adminView && !adminView.classList.contains('hidden')) {
    toggleAdminView();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- HIỂN THỊ TRẠNG THÁI ĐƠN HÀNG TUỲ THEO CÁCH MUA (TRONG PHẦN GIỎ HÀNG) ---
function getCustomerOrderStatusDetail(order) {
  const type = order.orderType || 'takeaway';
  const status = order.status || 'pending';

  const step3ShortLabel = type === 'delivery'
    ? '3. Đang giao'
    : type === 'dinein'
      ? '3. Phục vụ bàn'
      : '3. Chờ lấy món';

  if (status === 'pending') {
    return {
      stepIndex: 1,
      step3ShortLabel,
      headline: '⏳ Đã gửi đơn - Chờ quán xác nhận',
      subtext: 'Quán đã nhận thông báo đơn hàng của bạn và sẽ xác nhận làm ngay.',
      boxClass: 'bg-amber-50 border-amber-200 text-amber-900',
      badgeClass: 'bg-amber-100 text-amber-800 border border-amber-300'
    };
  }
  if (status === 'preparing') {
    return {
      stepIndex: 2,
      step3ShortLabel,
      headline: '👨‍🍳 Đơn hàng đã được nhận (Đang pha chế)',
      subtext: 'Quầy pha chế The 30 đã tiếp nhận đơn và đang làm món cho bạn!',
      boxClass: 'bg-blue-50 border-blue-200 text-blue-900',
      badgeClass: 'bg-blue-100 text-blue-800 border border-blue-300'
    };
  }
  if (status === 'shipping') {
    if (type === 'delivery') {
      return {
        stepIndex: 3,
        step3ShortLabel,
        headline: '🛵 Đơn hàng đang trên đường giao đến bạn',
        subtext: `Shipper đang giao món tới: ${order.address || 'địa chỉ của bạn'}`,
        boxClass: 'bg-purple-50 border-purple-200 text-purple-900',
        badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300'
      };
    }
    if (type === 'dinein') {
      return {
        stepIndex: 3,
        step3ShortLabel,
        headline: '🍽️ Món đã xong - Đang mang ra phục vụ tại bàn',
        subtext: `Nhân viên đang phục vụ món tại: ${order.address || 'bàn của bạn'}`,
        boxClass: 'bg-purple-50 border-purple-200 text-purple-900',
        badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300'
      };
    }
    return {
      stepIndex: 3,
      step3ShortLabel,
      headline: '🛍️ Món đã làm xong - Mời bạn nhận tại quầy',
      subtext: 'Đồ uống của bạn đã đóng gói hoàn tất, sẵn sàng mang đi!',
      boxClass: 'bg-purple-50 border-purple-200 text-purple-900',
      badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300'
    };
  }
  if (status === 'completed') {
    const doneHeadline = type === 'delivery'
      ? '✅ Đơn hàng đã giao hoàn thành'
      : type === 'dinein'
        ? '✅ Đơn hàng đã phục vụ hoàn thành'
        : '✅ Đơn hàng đã hoàn thành';
    return {
      stepIndex: 4,
      step3ShortLabel,
      headline: doneHeadline,
      subtext: 'Cảm ơn bạn đã thưởng thức đồ uống tại The 30 - Coffee & Tea!',
      boxClass: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    };
  }
  return {
    stepIndex: 0,
    step3ShortLabel,
    headline: '❌ Đơn hàng đã hủy',
    subtext: 'Đơn hàng này đã bị hủy.',
    boxClass: 'bg-rose-50 border-rose-200 text-rose-900',
    badgeClass: 'bg-rose-100 text-rose-800 border border-rose-300'
  };
}

function renderCartOrderHistory() {
  const listContainer = document.getElementById('cartOrderHistoryList');
  const countBadge = document.getElementById('cartHistoryCountBadge');
  if (!listContainer) return;

  const myOrders = getMyPurchasedOrders().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (countBadge) {
    countBadge.textContent = `${myOrders.length} đơn`;
  }

  if (myOrders.length === 0) {
    listContainer.innerHTML = `
      <div class="bg-white rounded-xl border border-slate-200 p-5 text-center text-slate-400 space-y-1.5">
        <i class="fa-solid fa-receipt text-xl text-slate-300"></i>
        <p class="text-xs font-semibold text-slate-500">Bạn chưa có đơn hàng nào đã đặt</p>
        <p class="text-[11px] text-slate-400">Khi bạn đặt món, danh sách đơn và trạng thái làm món / giao hàng sẽ hiển thị ngay tại đây.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = myOrders.map(order => {
    const stDetail = getCustomerOrderStatusDetail(order);
    const isCash = order.paymentMethod === 'cash' || order.paymentStatus === 'cash_pending';
    const isPaid = order.paymentStatus === 'paid' || order.paymentStatus === 'paid_reported';
    const showQrBtn = !isCash && !isPaid && order.status !== 'cancelled' && order.status !== 'completed';
    const typeLabel = order.orderType === 'dinein'
      ? `Tại bàn${order.address ? ' (' + order.address + ')' : ''}`
      : order.orderType === 'delivery'
        ? `Giao tận nơi${order.address ? ' (' + order.address + ')' : ''}`
        : `Mang đi${order.address ? ' (' + order.address + ')' : ''}`;
    const paymentLabel = isPaid
      ? `<span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">✓ Đã thanh toán</span>`
      : isCash
        ? `<span class="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">💵 Tiền mặt khi nhận</span>`
        : `<span class="text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">⏳ Chờ quét QR</span>`;

    return `
      <div class="bg-white rounded-xl border border-slate-200 shadow-sm p-3.5 space-y-2.5">
        <!-- Đầu thẻ đơn: Mã đơn + Thời gian + Thanh toán -->
        <div class="flex flex-wrap items-center justify-between gap-1.5 border-b border-slate-100 pb-2">
          <div class="flex items-center gap-1.5">
            <span class="font-mono font-extrabold text-xs text-brand-900 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              ${order.id}
            </span>
            <span class="text-[10px] text-slate-400">${formatDate(order.createdAt)}</span>
          </div>
          ${paymentLabel}
        </div>

        <!-- Khung Trạng Thái Đơn Hàng Nổi Bật -->
        <div class="p-2.5 rounded-xl border ${stDetail.boxClass} space-y-1">
          <div class="text-xs font-extrabold">${stDetail.headline}</div>
          <p class="text-[11px] opacity-85 leading-snug">${stDetail.subtext}</p>
        </div>

        ${order.status !== 'cancelled' ? `
          <div class="grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
            <div class="py-1 px-1 rounded ${stDetail.stepIndex >= 1 ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-50 text-slate-400'}">
              1. Đặt đơn
            </div>
            <div class="py-1 px-1 rounded ${stDetail.stepIndex >= 2 ? 'bg-blue-100 text-blue-900 border border-blue-300' : 'bg-slate-50 text-slate-400'}">
              2. Đã nhận
            </div>
            <div class="py-1 px-1 rounded ${stDetail.stepIndex >= 3 ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-slate-50 text-slate-400'}">
              ${stDetail.step3ShortLabel}
            </div>
            <div class="py-1 px-1 rounded ${stDetail.stepIndex >= 4 ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-slate-50 text-slate-400'}">
              4. Hoàn thành
            </div>
          </div>
        ` : ''}

        <!-- Danh sách món đã mua trong đơn này -->
        <div class="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1 text-xs">
          <div class="text-[11px] font-semibold text-slate-500 pb-1 border-b border-slate-200/60 flex items-center justify-between">
            <span><i class="fa-solid fa-location-dot mr-1 text-brand-700"></i>${typeLabel}</span>
            <span class="font-extrabold text-brand-900">${formatPrice(order.totalAmount)}</span>
          </div>
          <div class="pt-1 space-y-1">
            ${(order.items || []).map(item => `
              <div class="flex items-start justify-between text-[11px]">
                <span class="text-slate-800">
                  <strong class="text-brand-900">${item.quantity}x</strong> ${item.name}
                  ${item.note ? `<em class="text-amber-700">(${item.note})</em>` : ''}
                </span>
                <span class="text-slate-600 font-semibold">${formatPrice((item.price || 0) * (item.quantity || 1))}</span>
              </div>
            `).join('')}
          </div>
        </div>

        ${showQrBtn ? `
          <button onclick="reopenOrderQr('${order.id}')" class="w-full bg-amber-400 hover:bg-amber-300 text-brand-950 text-xs font-extrabold py-2 rounded-lg shadow-sm transition flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-qrcode"></i>
            <span>Mở mã QR để thanh toán đơn này</span>
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function renderCustomerOrderTracker() {
  renderCartOrderHistory();
  updateCartBadge();
}

function reopenOrderQr(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    closeCartDrawer();
    openQrModal(order);
  }
}

// --- ĐẶT HÀNG & THANH TOÁN (HỖ TRỢ CẢ CHUYỂN KHOẢN QR & TIỀN MẶT) ---
async function handleProceedToOrder() {
  if (state.cart.length === 0) {
    alert('Giỏ hàng của bạn đang trống.');
    return;
  }

  if (!state.currentUser || !state.currentUser.phone) {
    closeCartDrawer();
    openLoginModal();
    return;
  }

  const locationVal = document.getElementById('orderLocationInput').value.trim();
  if (state.selectedOrderType === 'dinein' && !locationVal) {
    alert('Vui lòng nhập Số bàn để quán phục vụ đúng vị trí của bạn.');
    return;
  }
  if (state.selectedOrderType === 'delivery' && !locationVal) {
    alert('Vui lòng nhập Địa chỉ giao hàng để quán giao tận nơi.');
    return;
  }

  const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  const payMethod = state.selectedPaymentMethod === 'cash' ? 'cash' : 'qr';

  const orderData = {
    id: orderId,
    customerPhone: state.currentUser.phone,
    customerName: state.currentUser.name,
    orderType: state.selectedOrderType,
    paymentMethod: payMethod,
    address: locationVal,
    note: locationVal,
    items: state.cart.map(i => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      note: i.note || ''
    })),
    totalAmount: totalAmount,
    status: 'pending',
    paymentStatus: payMethod === 'cash' ? 'cash_pending' : 'unpaid',
    createdAt: new Date().toISOString()
  };

  // Lưu vào LocalStorage đơn hàng và ghi nhận đây là đơn của khách này ngay lập tức
  state.orders.unshift(orderData);
  localStorage.setItem('the30_orders', JSON.stringify(state.orders));

  if (!Array.isArray(state.myOrderIds)) state.myOrderIds = [];
  if (!state.myOrderIds.includes(orderId)) {
    state.myOrderIds.unshift(orderId);
    localStorage.setItem('the30_my_order_ids', JSON.stringify(state.myOrderIds));
  }

  // Phát sóng đơn hàng mới lên Cloud Sync để máy Quản lý (Admin) trên mọi nền tảng nhận ngay tức thì
  pushCloudEvent('UPSERT_ORDER', { order: orderData });

  // Làm trống giỏ hàng sau khi tạo đơn
  state.cart = [];
  saveCart();
  updateCartBadge();
  renderProducts();
  renderCartItems();
  updateAdminHeaderOrdersCount();

  // Nếu khách chọn Thanh toán Tiền mặt -> Không hiện QR, đẩy thẳng xuống danh sách Đơn đã đặt trong Giỏ hàng
  if (payMethod === 'cash') {
    playTingTingSound();
    showToast('🎉 Đặt đơn tiền mặt thành công! Quán đã nhận thông báo đơn của bạn.');
    const historySec = document.getElementById('cartOrderHistorySection');
    if (historySec) {
      historySec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (isPhpBackendAvailable === true) {
      fetch(`${API_URL}?action=create_order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      }).catch(() => {});
    }
    return;
  }

  // Nếu khách chọn Chuyển khoản QR -> Đóng Drawer giỏ hàng & Mở Modal Mã QR Thanh Toán ngay lập tức
  closeCartDrawer();
  openQrModal(orderData);

  // Đồng bộ đơn hàng lên Backend PHP (nếu có)
  if (isPhpBackendAvailable === true) {
    try {
      const res = await fetch(`${API_URL}?action=create_order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.order) {
          orderData.apipayPublicId = data.order.apipayPublicId || orderData.apipayPublicId || '';
          orderData.apipayQrUrl = data.order.apipayQrUrl || orderData.apipayQrUrl || '';
          orderData.apipayPayUrl = data.order.apipayPayUrl || orderData.apipayPayUrl || '';
          localStorage.setItem('the30_orders', JSON.stringify(state.orders));
        }
      }
    } catch (err) {}
  }
}

let currentPollingOrderId = null;
let paymentPollInterval = null;
let paymentPollTimeout = null;
let qrAutoCloseTimer = null;

// Âm thanh báo "Ting!" thanh toán thành công trong trẻo như tiếng chuông ngân hàng (Web Audio API)
function playTingTingSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Tầng âm chính (Fundamental Sine - Nốt Sol 6: 1567.98 Hz tạo tiếng "Ting!" sắc nét)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1567.98, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.45, now + 0.008);
    gain1.gain.exponentialRampToValueAtTime(0.0008, now + 0.95);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.96);

    // Tầng âm bồi kim loại (Harmonic Overtone - 3135.96 Hz giúp tiếng chuông "Ting" ngân trong trẻo)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3135.96, now);
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.18, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0005, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.46);
  } catch (e) {}
}

// Sao chép nhanh số tài khoản / nội dung
function copyText(text, label = 'Nội dung') {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Đã sao chép ${label} thành công!`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(`Đã sao chép ${label}!`);
}

function openQrModal(order) {
  enforceOfficialBankSettings();
  if (qrAutoCloseTimer) {
    clearTimeout(qrAutoCloseTimer);
    qrAutoCloseTimer = null;
  }

  const modal = document.getElementById('qrModal');
  const qrImg = document.getElementById('qrImageDisplay');
  const orderIdEl = document.getElementById('qrOrderIdDisplay');
  const amountEl = document.getElementById('qrAmountDisplay');
  const bankEl = document.getElementById('qrBankDisplay');
  const accountEl = document.getElementById('qrAccountDisplay');
  const accountNameEl = document.getElementById('qrAccountNameDisplay');
  const contentEl = document.getElementById('qrContentDisplay');
  const waitingBox = document.getElementById('qrWaitingContainer');
  const successBox = document.getElementById('qrSuccessContainer');

  // Đặt lại giao diện trạng thái chờ
  if (waitingBox) waitingBox.classList.remove('hidden');
  if (successBox) successBox.classList.add('hidden');

  currentPollingOrderId = order.id;
  state.currentQrAmount = order.totalAmount;

  const bankCode = state.settings.bankCode || 'ICB';
  const bankAccount = state.settings.bankAccount || '100880871374';
  const bankAccountName = state.settings.bankAccountName || 'THE30s_COFFEE';

  orderIdEl.textContent = order.id;
  amountEl.textContent = formatPrice(order.totalAmount);
  bankEl.textContent = (bankCode === 'ICB' || bankCode.toUpperCase() === 'VIETINBANK')
    ? 'VietinBank (ICB)'
    : bankCode;
  accountEl.textContent = bankAccount;
  accountNameEl.textContent = bankAccountName;
  
  // Cú pháp chuyển khoản chuẩn không dấu gạch ngang để mọi ngân hàng giữ nguyên 100%
  const transferContent = order.transferContent || getOrderTransferContent(order.id);
  contentEl.textContent = transferContent;

  const vietQrCode = (bankCode.toUpperCase() === 'VIETINBANK') ? 'ICB' : bankCode;
  const bank = encodeURIComponent(vietQrCode);
  const acc = encodeURIComponent(bankAccount);
  const name = encodeURIComponent(bankAccountName);
  const buildCleanVietQrUrl = (contentStr) =>
    `https://img.vietqr.io/image/${bank}-${acc}-qr_only.png?amount=${order.totalAmount}&addInfo=${encodeURIComponent(contentStr)}&accountName=${name}`;

  const vietQrUrl = buildCleanVietQrUrl(transferContent);

  qrImg.onerror = () => {
    if (qrImg.src !== vietQrUrl) {
      qrImg.src = vietQrUrl;
    }
  };

  // Luôn hiển thị mã QR chính chủ VietQR của THE 30 - COFFEE & TEA (Tuyệt đối không hiện ảnh chứa logo/tên ApiPay)
  if (state.settings.qrImageUrl && state.settings.qrImageUrl.trim() !== '' && !state.settings.qrImageUrl.includes('apipay.vn')) {
    qrImg.src = state.settings.qrImageUrl;
  } else {
    qrImg.src = vietQrUrl;
  }

  modal.classList.remove('hidden');

  // Khởi tạo ngầm Payment Request với ngân hàng để đối soát tự động (Không ghi đè ảnh QR của quán)
  if (!order.apipayPublicId) {
    createApiPayPaymentDirect(order).then(apipayInfo => {
      if (apipayInfo && apipayInfo.content && currentPollingOrderId === order.id) {
        contentEl.textContent = apipayInfo.content;
        if (!state.settings.qrImageUrl || state.settings.qrImageUrl.trim() === '') {
          qrImg.src = buildCleanVietQrUrl(apipayInfo.content);
        }
      }
    }).catch(() => {});
  }

  // Khởi động vòng lặp kiểm tra tự động trạng thái thanh toán (Polling mỗi 3 giây)
  startPaymentPolling(order.id);
}

function startPaymentPolling(orderId) {
  stopPaymentPolling();

  paymentPollInterval = setInterval(async () => {
    await checkPaymentStatus(orderId);
  }, 3000);

  // Tự dừng kiểm tra sau 15 phút nếu khách không chuyển tiền
  paymentPollTimeout = setTimeout(() => {
    stopPaymentPolling();
  }, 15 * 60 * 1000);
}

function stopPaymentPolling() {
  if (paymentPollInterval) {
    clearInterval(paymentPollInterval);
    paymentPollInterval = null;
  }
  if (paymentPollTimeout) {
    clearTimeout(paymentPollTimeout);
    paymentPollTimeout = null;
  }
}

async function checkPaymentStatus(orderId) {
  const order = state.orders.find(o => o.id === orderId);
  const apipayPid = order && order.apipayPublicId ? order.apipayPublicId : '';

  // 1. Kiểm tra trực tiếp trên hệ thống ApiPay Live (Hoạt động 100% trên GitHub Pages!)
  try {
    const isPaidOnApiPay = await checkApiPayOrderDirect(orderId);
    if (isPaidOnApiPay) {
      onPaymentSuccess(orderId, false);
      return true;
    }
  } catch (errDirect) {}

  // 2. Kiểm tra qua Backend PHP (nếu chạy trên hosting có PHP)
  if (isPhpBackendAvailable === true) {
    try {
      const res = await fetch(`${API_URL}?action=check_payment_status&orderId=${encodeURIComponent(orderId)}&apipayPublicId=${encodeURIComponent(apipayPid)}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && (data.paid || data.isPaid || data.paymentStatus === 'paid')) {
          onPaymentSuccess(orderId, false);
          return true;
        }
      }
    } catch (err) {}
  }

  // 3. Kiểm tra đồng bộ trong LocalStorage
  try {
    const cachedOrders = JSON.parse(localStorage.getItem('the30_orders') || '[]');
    const found = cachedOrders.find(o => o.id === orderId);
    if (found && found.paymentStatus === 'paid') {
      onPaymentSuccess(orderId, false);
      return true;
    }
  } catch (e) {}

  return false;
}

async function checkPaymentManual() {
  if (!currentPollingOrderId) return;
  showToast('Đang kiểm tra giao dịch tự động với ngân hàng...', 'info');
  const isPaid = await checkPaymentStatus(currentPollingOrderId);
  if (!isPaid) {
    showToast('Hệ thống đang chờ ngân hàng xác nhận giao dịch...', 'info');
  }
}

function onPaymentSuccess(orderId, isCustomerReported = false) {
  stopPaymentPolling();
  playTingTingSound();

  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.paymentStatus = isCustomerReported ? 'paid_reported' : 'paid';
    localStorage.setItem('the30_orders', JSON.stringify(state.orders));
    pushCloudEvent('UPSERT_ORDER', { order });
  }

  const waitingBox = document.getElementById('qrWaitingContainer');
  const successBox = document.getElementById('qrSuccessContainer');
  const successOrderId = document.getElementById('qrSuccessOrderId');

  // Chuyển sang Tick Xanh thông báo đã thanh toán thành công
  if (waitingBox) waitingBox.classList.add('hidden');
  if (successBox) successBox.classList.remove('hidden');
  if (successOrderId) successOrderId.textContent = orderId;

  renderCartItems();
  updateCartBadge();
  updateAdminHeaderOrdersCount();
  if (state.isAdminLoggedIn && state.activeAdminTab === 'orders') {
    renderAdminOrders();
  }

  showToast('✓ Thanh toán thành công! Ngân hàng đã nhận được tiền.');

  // Tự động tắt bảng QR sau 2 giây khi đã hiện Tick xanh
  if (qrAutoCloseTimer) clearTimeout(qrAutoCloseTimer);
  qrAutoCloseTimer = setTimeout(() => {
    closeQrModal();
  }, 2000);
}

function closeQrModal() {
  stopPaymentPolling();
  if (qrAutoCloseTimer) {
    clearTimeout(qrAutoCloseTimer);
    qrAutoCloseTimer = null;
  }
  document.getElementById('qrModal').classList.add('hidden');
  currentPollingOrderId = null;
  renderCartItems();
  updateCartBadge();
}

// --- GIAO DIỆN QUẢN LÝ (ADMIN DASHBOARD) ---
function updateAdminHeaderOrdersCount() {
  const pendingOrders = state.orders.filter(o => o.status === 'pending').length;
  const preparingOrders = state.orders.filter(o => o.status === 'preparing').length;
  const shippingOrders = state.orders.filter(o => o.status === 'shipping').length;
  const activeOrders = pendingOrders + preparingOrders + shippingOrders;
  const completedOrders = state.orders.filter(o => o.status === 'completed').length;
  const cancelledOrders = state.orders.filter(o => o.status === 'cancelled').length;
  const totalOrdersCount = state.orders.length;
  const totalRevenue = state.orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const adminView = document.getElementById('adminView');
  const isViewingAdmin = Boolean(state.isAdminLoggedIn && adminView && !adminView.classList.contains('hidden'));

  // 1. Thanh thông báo màu vàng/cam (CHỈ HIỆN TRONG TRANG ADMIN KHI CÓ ĐƠN MỚI, TỰ BIẾN MẤT KHI HẾT ĐƠN)
  const alertBar = document.getElementById('liveOrderAlertBar');
  const alertText = document.getElementById('liveOrderAlertText');
  if (alertBar && alertText) {
    if (isViewingAdmin && pendingOrders > 0) {
      alertText.textContent = `🔔 Có ${pendingOrders} đơn hàng mới đang chờ xác nhận! Bấm vào đây để xem & xử lý ngay`;
      alertBar.classList.remove('hidden');
    } else {
      alertBar.classList.add('hidden');
    }
  }

  // 2. Nút Đơn cần xử lý trên Header (TUYỆT ĐỐI KHÔNG HIỆN Ở TRANG KHÁCH HÀNG)
  const headerOrdersBadge = document.getElementById('headerAdminOrdersCount');
  const headerOrdersBtn = document.getElementById('headerAdminOrdersBtn');
  if (headerOrdersBtn) {
    if (isViewingAdmin) {
      headerOrdersBtn.classList.remove('hidden');
      if (headerOrdersBadge) {
        if (pendingOrders > 0) {
          headerOrdersBadge.textContent = pendingOrders;
          headerOrdersBadge.className = 'bg-rose-600 text-white font-black text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center animate-pulse';
          headerOrdersBadge.classList.remove('hidden');
        } else {
          // Tự động ẩn số đếm khi không còn đơn chờ xác nhận (không hiện số 0 cứng)
          headerOrdersBadge.textContent = '';
          headerOrdersBadge.classList.add('hidden');
        }
      }
    } else {
      headerOrdersBtn.classList.add('hidden');
    }
  }

  // 3. Tab Badge trên nút "Đơn đặt hàng" trong Menu Quản lý (tự ẩn khi bằng 0)
  const adminPendingBadge = document.getElementById('adminPendingCountBadge');
  if (adminPendingBadge) {
    if (pendingOrders > 0) {
      adminPendingBadge.textContent = pendingOrders;
      adminPendingBadge.className = 'bg-amber-400 text-brand-950 font-black text-xs px-2 py-0.5 rounded-full ml-1 animate-pulse';
      adminPendingBadge.classList.remove('hidden');
    } else {
      adminPendingBadge.textContent = '';
      adminPendingBadge.classList.add('hidden');
    }
  }

  // 4. Các thẻ thống kê nhanh (KPI Cards)
  const kpiActive = document.getElementById('kpiActiveOrdersCount');
  const kpiPending = document.getElementById('kpiPendingOrdersCount');
  const kpiCompleted = document.getElementById('kpiCompletedOrdersCount');
  const kpiRevenue = document.getElementById('kpiTotalRevenue');
  if (kpiActive) kpiActive.textContent = activeOrders;
  if (kpiPending) kpiPending.textContent = pendingOrders;
  if (kpiCompleted) kpiCompleted.textContent = completedOrders;
  if (kpiRevenue) kpiRevenue.textContent = formatPrice(totalRevenue);

  // 5. Cập nhật số đếm trên từng Tab bộ lọc
  const bActive = document.getElementById('tabBadge-active');
  const bPending = document.getElementById('tabBadge-pending');
  const bPrep = document.getElementById('tabBadge-preparing');
  const bShip = document.getElementById('tabBadge-shipping');
  const bComp = document.getElementById('tabBadge-completed');
  const bCanc = document.getElementById('tabBadge-cancelled');
  const bAll = document.getElementById('tabBadge-all');
  if (bActive) bActive.textContent = activeOrders;
  if (bPending) bPending.textContent = pendingOrders;
  if (bPrep) bPrep.textContent = preparingOrders;
  if (bShip) bShip.textContent = shippingOrders;
  if (bComp) bComp.textContent = completedOrders;
  if (bCanc) bCanc.textContent = cancelledOrders;
  if (bAll) bAll.textContent = totalOrdersCount;
}

// Bấm vào thông báo đơn mới hoặc nút Đơn cần xử lý -> Mở ngay danh sách đơn và cuộn mượt tới đó
function handleOrderAlertClick() {
  if (!state.isAdminLoggedIn) {
    document.getElementById('adminPinModal').classList.remove('hidden');
    document.getElementById('adminPinInput').value = '';
    document.getElementById('adminPinInput').focus();
    return;
  }
  const customerView = document.getElementById('customerView');
  const adminView = document.getElementById('adminView');
  if (adminView.classList.contains('hidden')) {
    customerView.classList.add('hidden');
    adminView.classList.remove('hidden');
    document.getElementById('adminToggleText').textContent = 'Trang Khách';
    const cartBtn = document.getElementById('headerCartBtn');
    if (cartBtn) cartBtn.classList.add('hidden');
  }
  switchAdminTab('orders');
  const hasPending = state.orders.some(o => o.status === 'pending');
  setOrderFilter(hasPending ? 'pending' : 'active');
  updateAdminHeaderOrdersCount();

  const ordersListEl = document.getElementById('adminOrdersList');
  if (ordersListEl) {
    ordersListEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function handleHeaderAdminOrdersClick() {
  handleOrderAlertClick();
}

function setOrderFilter(filterKey) {
  state.activeOrderFilter = filterKey;
  const filterKeys = ['active', 'pending', 'preparing', 'shipping', 'completed', 'cancelled', 'all'];
  filterKeys.forEach(k => {
    const btn = document.getElementById(`btnOrderFilter-${k}`);
    if (btn) {
      if (k === filterKey) {
        btn.className = 'order-filter-btn px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-brand-900 text-white shadow-sm whitespace-nowrap';
      } else {
        btn.className = 'order-filter-btn px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 whitespace-nowrap';
      }
    }
  });
  renderAdminOrders();
}

function handleOrderSearch(query) {
  state.orderSearchQuery = (query || '').trim().toLowerCase();
  renderAdminOrders();
}

function toggleAdminView() {
  const customerView = document.getElementById('customerView');
  const adminView = document.getElementById('adminView');
  const toggleText = document.getElementById('adminToggleText');
  const cartBtn = document.getElementById('headerCartBtn');
  const adminOrdersBtn = document.getElementById('headerAdminOrdersBtn');

  if (adminView.classList.contains('hidden')) {
    // Muốn vào Admin -> Kiểm tra mật khẩu PIN
    if (!state.isAdminLoggedIn) {
      document.getElementById('adminPinModal').classList.remove('hidden');
      document.getElementById('adminPinInput').value = '';
      document.getElementById('adminPinInput').focus();
      return;
    }
    // Đã đăng nhập PIN -> Chuyển sang Quản lý
    customerView.classList.add('hidden');
    adminView.classList.remove('hidden');
    toggleText.textContent = 'Trang Khách';

    // Đổi nút Header: Ẩn Giỏ hàng, Hiện Đơn cần xử lý
    if (cartBtn) cartBtn.classList.add('hidden');
    if (adminOrdersBtn) adminOrdersBtn.classList.remove('hidden');
    updateAdminHeaderOrdersCount();

    switchAdminTab(state.activeAdminTab);
  } else {
    // Về lại trang khách
    customerView.classList.remove('hidden');
    adminView.classList.add('hidden');
    toggleText.textContent = 'Quản lý';

    // Hiện lại nút Giỏ hàng, ẨN HOÀN TOÀN nút Đơn đặt hàng và thông báo Admin
    if (cartBtn) cartBtn.classList.remove('hidden');
    if (adminOrdersBtn) adminOrdersBtn.classList.add('hidden');
    updateAdminHeaderOrdersCount();
    renderCustomerOrderTracker();
  }
}

function closeAdminPinModal() {
  document.getElementById('adminPinModal').classList.add('hidden');
}

function handleAdminPinSubmit(e) {
  e.preventDefault();
  const inputPin = document.getElementById('adminPinInput').value.trim();
  const correctPin = state.settings.adminPin || '123456';

  if (inputPin === correctPin) {
    state.isAdminLoggedIn = true;
    closeAdminPinModal();
    toggleAdminView();
    showToast('Đăng nhập Quản lý thành công!');
  } else {
    alert('Mã PIN không chính xác! (Mặc định: 123456)');
  }
}

function switchAdminTab(tabKey) {
  state.activeAdminTab = tabKey;
  const tabs = ['orders', 'products', 'banners', 'settings'];

  tabs.forEach(t => {
    const btn = document.getElementById(`adminTabBtn-${t}`);
    const content = document.getElementById(`adminTabContent-${t}`);
    if (t === tabKey) {
      btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-brand-900 text-white shadow-md';
      content.classList.remove('hidden');
    } else {
      btn.className = 'admin-tab-btn px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 bg-white text-slate-700 hover:bg-slate-100 border border-slate-200';
      content.classList.add('hidden');
    }
  });

  if (tabKey === 'orders') renderAdminOrders();
  if (tabKey === 'products') renderAdminProducts();
  if (tabKey === 'banners') renderAdminBanners();
  if (tabKey === 'settings') populateSettingsForm();
}

// Thẻ hiển thị từng đơn hàng trong Admin
function renderSingleAdminOrderCard(order) {
  const statusInfo = getOrderStatusBadge(order.status, order.orderType);
  const paymentBadge = getPaymentStatusBadge(order.paymentStatus, order.paymentMethod);
  const isCompleted = (order.status === 'completed');
  const isCancelled = (order.status === 'cancelled');

  const shippingActionLabel = order.orderType === 'delivery'
    ? '🛵 Đang trên đường giao'
    : order.orderType === 'dinein'
      ? '🍽️ Phục vụ tại bàn'
      : '🛍️ Xong món - Chờ khách lấy';

  return `
    <div class="bg-white rounded-xl border ${isCompleted ? 'border-emerald-200 bg-emerald-50/20' : isCancelled ? 'border-rose-200 bg-rose-50/10 opacity-80' : 'border-slate-200'} p-4 sm:p-5 shadow-sm hover:shadow-md transition space-y-3">
      <!-- Hàng đầu: Mã đơn, Thời gian, Thanh toán & Trạng thái -->
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono font-extrabold text-sm sm:text-base text-brand-900 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
            ${order.id}
          </span>
          <span class="text-xs text-slate-400">
            <i class="fa-regular fa-clock mr-1"></i>${formatDate(order.createdAt)}
          </span>
          <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full ${paymentBadge.badgeClass}">
            ${paymentBadge.text}
          </span>
          ${order.completedAt ? `
            <span class="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200 hidden sm:inline">
              <i class="fa-solid fa-check mr-1"></i>Xong lúc: ${formatDate(order.completedAt)}
            </span>
          ` : ''}
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-2.5 py-1 rounded-full ${statusInfo.badgeClass}">
            ${statusInfo.text}
          </span>
          <button onclick="deleteOrder('${order.id}')" class="text-slate-300 hover:text-rose-600 p-1 rounded transition" title="Xóa đơn này">
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Thông tin khách hàng & Hình thức nhận -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <div>
          <span class="text-slate-500">Khách hàng:</span>
          <span class="font-bold text-slate-800 ml-1">${order.customerName}</span>
          <a href="tel:${order.customerPhone}" class="text-brand-900 font-mono font-bold hover:underline ml-2">
            <i class="fa-solid fa-phone text-[10px]"></i> ${order.customerPhone}
          </a>
        </div>
        <div>
          <span class="text-slate-500">Hình thức:</span>
          <span class="font-bold text-slate-800 ml-1">${getOrderTypeName(order.orderType)}</span>
          ${order.address ? `<span class="text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-medium ml-1">(${order.address})</span>` : ''}
        </div>
      </div>

      <!-- Chi tiết các món được gọi -->
      <div class="space-y-1.5 pt-1">
        <p class="text-xs font-bold text-slate-700 flex items-center justify-between">
          <span>Chi tiết món đã gọi:</span>
          <span class="text-[11px] font-semibold text-slate-400">Tổng ${order.items ? order.items.reduce((s, i) => s + i.quantity, 0) : 0} phần</span>
        </p>
        <div class="divide-y divide-slate-100 bg-white border border-slate-200 rounded-lg p-3 space-y-2">
          ${(order.items || []).map(item => `
            <div class="flex items-start justify-between text-xs pt-1.5 first:pt-0">
              <div>
                <span class="font-black text-brand-900">${item.quantity}x</span>
                <span class="font-bold text-slate-800 ml-1">${item.name}</span>
                ${item.note ? `
                  <div class="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded inline-block mt-0.5">
                    <i class="fa-solid fa-pen-nib mr-1 text-[10px]"></i> Lưu ý: "${item.note}"
                  </div>
                ` : ''}
              </div>
              <span class="font-bold text-slate-700">${formatPrice(item.price * item.quantity)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Tổng tiền và nút chuyển trạng thái -->
      <div class="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
        <div class="text-xs">
          <span class="text-slate-500">Tổng thanh toán:</span>
          <span class="text-base font-black text-brand-900 ml-1">${formatPrice(order.totalAmount)}</span>
        </div>

        <!-- Nút đổi trạng thái đơn theo quy trình: Chấp nhận làm -> Giao/Phục vụ (tùy cách mua) -> Hoàn thành -->
        <div class="flex flex-wrap items-center gap-1.5">
          ${order.status === 'pending' ? `
            <button onclick="updateOrderStatus('${order.id}', 'preparing')" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
              <i class="fa-solid fa-mug-hot"></i> Chấp nhận & Làm món
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'completed')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
              <i class="fa-solid fa-check"></i> Hoàn thành ngay
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'cancelled')" class="bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition">
              Hủy đơn
            </button>
          ` : ''}

          ${order.status === 'preparing' ? `
            <button onclick="updateOrderStatus('${order.id}', 'shipping')" class="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
              <span>${shippingActionLabel}</span>
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'completed')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
              <i class="fa-solid fa-check"></i> Hoàn thành đơn
            </button>
            <button onclick="updateOrderStatus('${order.id}', 'cancelled')" class="bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-600 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition">
              Hủy
            </button>
          ` : ''}

          ${order.status === 'shipping' ? `
            <button onclick="updateOrderStatus('${order.id}', 'completed')" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
              <i class="fa-solid fa-check"></i> Đã giao / Hoàn thành đơn
            </button>
          ` : ''}

          ${order.status === 'completed' ? `
            <div class="flex items-center gap-2">
              <span class="text-xs text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                <i class="fa-solid fa-circle-check"></i> Đơn hàng đã hoàn thành
              </span>
              <button onclick="updateOrderStatus('${order.id}', 'preparing')" class="text-[11px] text-slate-400 hover:text-slate-600 underline" title="Chuyển lại về đang làm nếu bấm nhầm">
                Hoàn tác
              </button>
            </div>
          ` : ''}

          ${order.status === 'cancelled' ? `
            <span class="text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full flex items-center gap-1 border border-rose-200">
              <i class="fa-solid fa-ban"></i> Đơn đã hủy
            </span>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

// 1. Quản lý đơn hàng (Tách biệt nghiêm ngặt Đơn đang làm và Đơn đã hoàn thành)
function renderAdminOrders() {
  const container = document.getElementById('adminOrdersList');
  if (!container) return;

  // Luôn đồng bộ số liệu thông báo & KPI
  updateAdminHeaderOrdersCount();

  const filter = state.activeOrderFilter || 'active';
  let list = [...state.orders];

  // Chuẩn hóa status cho các đơn cũ nếu thiếu
  list.forEach(o => {
    if (!['pending', 'preparing', 'shipping', 'completed', 'cancelled'].includes(o.status)) {
      o.status = 'pending';
    }
  });

  // Phân loại đơn hàng nghiêm ngặt theo từng mục:
  if (filter === 'active') {
    // CHỈ hiển thị đơn cần làm (chờ xác nhận, đang pha chế, đang giao) - TUYỆT ĐỐI KHÔNG LẪN ĐƠN HOÀN THÀNH
    list = list.filter(o => ['pending', 'preparing', 'shipping'].includes(o.status));
  } else if (filter === 'completed') {
    // Chỉ hiển thị riêng các đơn đã hoàn thành
    list = list.filter(o => o.status === 'completed');
  } else if (filter !== 'all') {
    list = list.filter(o => o.status === filter);
  }

  // Lọc theo thanh tìm kiếm
  if (state.orderSearchQuery) {
    const q = state.orderSearchQuery;
    list = list.filter(o => 
      (o.id && o.id.toLowerCase().includes(q)) ||
      (o.customerName && o.customerName.toLowerCase().includes(q)) ||
      (o.customerPhone && o.customerPhone.includes(q)) ||
      (o.address && o.address.toLowerCase().includes(q))
    );
  }

  // Đơn hàng mới nhất lên đầu
  list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Trạng thái trống tùy theo Tab
  if (list.length === 0) {
    let emptyIcon = 'fa-clipboard-list';
    let emptyTitle = 'Chưa có đơn hàng nào trong mục này.';
    let emptySub = 'Khi có đơn hàng mới phát sinh, thông tin sẽ tự động hiển thị tại đây.';

    if (filter === 'active') {
      emptyIcon = 'fa-circle-check text-emerald-500';
      emptyTitle = '🎉 Tuyệt vời! Không còn đơn nào đang chờ xử lý.';
      emptySub = 'Toàn bộ đơn hàng đã hoàn tất đều đã được tự động chuyển sang mục "✅ Đã hoàn thành".';
    } else if (filter === 'pending') {
      emptyIcon = 'fa-bell-slash text-slate-400';
      emptyTitle = 'Không có đơn mới nào đang chờ xác nhận.';
      emptySub = 'Khi khách đặt món mới, thông báo sẽ lập tức xuất hiện tại đây.';
    } else if (filter === 'completed') {
      emptyIcon = 'fa-receipt text-slate-300';
      emptyTitle = 'Chưa có đơn hàng nào trong mục Đã hoàn thành.';
      emptySub = 'Khi bạn bấm "Hoàn thành đơn", đơn hàng sẽ tự động chuyển sang mục này.';
    }

    container.innerHTML = `
      <div class="bg-white p-10 sm:p-14 rounded-2xl text-center text-slate-400 border border-slate-200 shadow-sm space-y-3">
        <div class="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-3xl">
          <i class="fa-solid ${emptyIcon}"></i>
        </div>
        <h4 class="text-sm sm:text-base font-extrabold text-slate-800">${emptyTitle}</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">${emptySub}</p>
        ${filter === 'active' && state.orders.some(o => o.status === 'completed') ? `
          <button onclick="setOrderFilter('completed')" class="mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-200 transition">
            <i class="fa-solid fa-circle-check mr-1"></i> Xem các đơn Đã hoàn thành (${state.orders.filter(o => o.status === 'completed').length})
          </button>
        ` : ''}
      </div>
    `;
    return;
  }

  // Nếu đang xem tab "Tất cả" (all), tách rõ 2 khu vực: Đơn đang xử lý ở trên & Đơn đã hoàn thành/hủy ở dưới để không bao giờ trộn lẫn
  if (filter === 'all') {
    const activeGroup = list.filter(o => ['pending', 'preparing', 'shipping'].includes(o.status));
    const finishedGroup = list.filter(o => ['completed', 'cancelled'].includes(o.status));

    let html = '';
    if (activeGroup.length > 0) {
      html += `
        <div class="space-y-3">
          <div class="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
            <i class="fa-solid fa-fire text-amber-600"></i>
            <span>Đơn hàng đang cần xử lý (${activeGroup.length})</span>
          </div>
          ${activeGroup.map(o => renderSingleAdminOrderCard(o)).join('')}
        </div>
      `;
    }
    if (finishedGroup.length > 0) {
      html += `
        <div class="space-y-3 pt-4">
          <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-circle-check text-emerald-600"></i>
              <span>Đơn hàng đã hoàn thành & lịch sử (${finishedGroup.length})</span>
            </div>
          </div>
          ${finishedGroup.map(o => renderSingleAdminOrderCard(o)).join('')}
        </div>
      `;
    }
    container.innerHTML = html;
    return;
  }

  container.innerHTML = list.map(order => renderSingleAdminOrderCard(order)).join('');
}

function getOrderStatusBadge(status, orderType = 'takeaway') {
  switch (status) {
    case 'pending':
      return { text: 'Chờ xác nhận', badgeClass: 'bg-amber-100 text-amber-800 border border-amber-300' };
    case 'preparing':
      return { text: 'Đơn đã nhận (Đang làm)', badgeClass: 'bg-blue-100 text-blue-800 border border-blue-300' };
    case 'shipping':
      if (orderType === 'delivery') {
        return { text: 'Đang trên đường giao', badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300' };
      }
      if (orderType === 'dinein') {
        return { text: 'Đang phục vụ tại bàn', badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300' };
      }
      return { text: 'Đã xong - Chờ khách lấy', badgeClass: 'bg-purple-100 text-purple-800 border border-purple-300' };
    case 'completed':
      return { text: 'Đơn hàng đã hoàn thành', badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300' };
    case 'cancelled':
      return { text: 'Đã hủy', badgeClass: 'bg-rose-100 text-rose-800 border border-rose-300' };
    default:
      return { text: 'Chờ xác nhận', badgeClass: 'bg-amber-100 text-amber-800 border border-amber-300' };
  }
}

function getPaymentStatusBadge(paymentStatus, paymentMethod = 'qr') {
  if (paymentStatus === 'paid') {
    return {
      text: paymentMethod === 'cash' ? '💵 Đã thu tiền mặt' : '💳 Đã TT tự động (VietQR)',
      badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-300'
    };
  }
  if (paymentStatus === 'paid_reported') {
    return { text: '📲 Khách báo đã CK QR', badgeClass: 'bg-sky-100 text-sky-800 border border-sky-300' };
  }
  if (paymentStatus === 'cash_pending' || paymentMethod === 'cash') {
    return { text: '💵 Tiền mặt (Thu khi nhận)', badgeClass: 'bg-amber-100 text-amber-900 border border-amber-300' };
  }
  return { text: '⏳ Chờ quét mã QR', badgeClass: 'bg-slate-100 text-slate-600 border border-slate-200' };
}

function getOrderTypeName(type) {
  switch (type) {
    case 'takeaway': return 'Mang đi (Takeaway)';
    case 'dinein': return 'Uống tại quán (Dine-in)';
    case 'delivery': return 'Giao tận nơi (Delivery)';
    default: return 'Tại quán';
  }
}

async function updateOrderStatus(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    if (newStatus === 'completed') {
      order.completedAt = new Date().toISOString();
      order.paymentStatus = 'paid';
    }
    localStorage.setItem('the30_orders', JSON.stringify(state.orders));
    // Phát sóng trạng thái đơn hàng sang máy Khách hàng và các trình duyệt khác ngay tức thì
    pushCloudEvent('UPSERT_ORDER', { order });
  }

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=update_order_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          status: newStatus,
          paymentStatus: newStatus === 'completed' ? 'paid' : undefined
        })
      });
    } catch (e) {}
  }

  // Nếu Admin đang đứng ở tab "Tất cả" (all) mà bấm Hoàn thành -> tự động đưa về bộ lọc Cần làm (active)
  if (newStatus === 'completed' && state.activeOrderFilter === 'all') {
    state.activeOrderFilter = 'active';
    setOrderFilter('active');
  } else {
    updateAdminHeaderOrdersCount();
    renderAdminOrders();
  }
  renderCartItems();
  updateCartBadge();

  if (newStatus === 'completed') {
    showToast(`✅ Đơn ${orderId} đã hoàn thành!`);
  } else if (newStatus === 'preparing') {
    showToast(`👨‍🍳 Đã nhận đơn ${orderId} - Khách đã thấy trạng thái "Đơn hàng đã được nhận"!`);
  } else if (newStatus === 'shipping') {
    const msg = order && order.orderType === 'delivery'
      ? `🛵 Đơn ${orderId} đã chuyển sang "Đang trên đường giao"!`
      : order && order.orderType === 'dinein'
        ? `🍽️ Đơn ${orderId} đã chuyển sang "Đang phục vụ tại bàn"!`
        : `🛍️ Đơn ${orderId} đã báo xong cho khách đến nhận!`;
    showToast(msg);
  } else if (newStatus === 'cancelled') {
    showToast(`Đã hủy đơn hàng ${orderId}.`);
  } else {
    showToast(`Cập nhật đơn hàng ${orderId} thành công!`);
  }
}

async function deleteOrder(orderId) {
  if (!confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${orderId}?`)) return;
  state.orders = state.orders.filter(o => o.id !== orderId);
  localStorage.setItem('the30_orders', JSON.stringify(state.orders));
  pushCloudEvent('DELETE_ORDER', { orderId });

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=delete_order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId })
      });
    } catch (e) {}
  }

  updateAdminHeaderOrdersCount();
  renderAdminOrders();
  renderCartItems();
  updateCartBadge();
  showToast(`Đã xóa đơn hàng ${orderId}.`);
}

// 2. Quản lý Món (Thêm / Sửa / Xóa)
function renderAdminProducts() {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  tbody.innerHTML = state.products.map(p => `
    <tr class="hover:bg-slate-50 transition">
      <td class="p-3">
        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 object-cover rounded-lg border border-slate-200">
      </td>
      <td class="p-3 font-bold text-slate-900">${p.name}</td>
      <td class="p-3 text-slate-600">${getCategoryName(p.category)}</td>
      <td class="p-3 font-extrabold text-brand-900">${formatPrice(p.price)}</td>
      <td class="p-3">
        ${p.isBestSeller ? '<span class="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">🔥 Có</span>' : '<span class="text-slate-400 text-xs">Không</span>'}
      </td>
      <td class="p-3 text-right space-x-1">
        <button onclick="editProduct('${p.id}')" class="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition" title="Sửa">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button onclick="deleteProduct('${p.id}')" class="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 transition" title="Xóa">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// --- HÀM TẢI & NÉN ẢNH CHO MÓN & BANNER (ĐỒNG BỘ MƯỢT TRÊN MỌI NỀN TẢNG) ---
async function uploadImageFile(file) {
  if (isPhpBackendAvailable === true) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${API_URL}?action=upload_image`, {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.url) {
          return data.url;
        }
      }
    } catch (err) {}
  }

  // Nén ảnh thông minh qua Canvas để đồng bộ đám mây giữa Chrome / Điện thoại nhanh & nhẹ
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 720;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.72));
        } catch (errCanvas) {
          resolve(e.target.result);
        }
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Xử lý chọn ảnh món
async function handleProductFileSelect(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  
  // Hiển thị xem trước ảnh ngay lập tức
  const previewUrl = URL.createObjectURL(file);
  document.getElementById('prodImagePreview').src = previewUrl;
  document.getElementById('prodImagePreviewWrapper').classList.remove('hidden');

  showToast('Đang xử lý tải ảnh lên...', 'info');
  const uploadedUrl = await uploadImageFile(file);
  document.getElementById('prodImageInput').value = uploadedUrl;
  showToast('Tải ảnh món thành công!');
}

function clearProductImage() {
  const fileInput = document.getElementById('prodFileInput');
  if (fileInput) fileInput.value = '';
  document.getElementById('prodImageInput').value = '';
  document.getElementById('prodImagePreview').src = '';
  document.getElementById('prodImagePreviewWrapper').classList.add('hidden');
}

// Xử lý chọn ảnh Banner
async function handleBannerFileSelect(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];

  // Hiển thị xem trước ảnh banner
  const previewUrl = URL.createObjectURL(file);
  document.getElementById('bannerImagePreview').src = previewUrl;
  document.getElementById('bannerImagePreviewWrapper').classList.remove('hidden');

  showToast('Đang xử lý tải ảnh banner...', 'info');
  const uploadedUrl = await uploadImageFile(file);
  document.getElementById('bannerImageInput').value = uploadedUrl;
  showToast('Tải ảnh banner thành công!');
}

function clearBannerImage() {
  const fileInput = document.getElementById('bannerFileInput');
  if (fileInput) fileInput.value = '';
  document.getElementById('bannerImageInput').value = '';
  document.getElementById('bannerImagePreview').src = '';
  document.getElementById('bannerImagePreviewWrapper').classList.add('hidden');
}

function openProductModal(isEdit = false) {
  document.getElementById('productModalTitle').textContent = isEdit ? 'Chỉnh Sửa Món' : 'Thêm Món Mới';
  if (!isEdit) {
    document.getElementById('productForm').reset();
    document.getElementById('prodEditId').value = '';
    clearProductImage();
  }
  document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
  document.getElementById('productForm').reset();
  document.getElementById('prodEditId').value = '';
  clearProductImage();
}

function editProduct(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  document.getElementById('prodEditId').value = prod.id;
  document.getElementById('prodNameInput').value = prod.name;
  document.getElementById('prodCategoryInput').value = prod.category;
  document.getElementById('prodPriceInput').value = prod.price;
  document.getElementById('prodImageInput').value = prod.image;
  document.getElementById('prodDescInput').value = prod.description || '';
  document.getElementById('prodBestSellerInput').checked = !!prod.isBestSeller;

  // Hiển thị ảnh hiện tại của món
  if (prod.image) {
    document.getElementById('prodImagePreview').src = prod.image;
    document.getElementById('prodImagePreviewWrapper').classList.remove('hidden');
  } else {
    clearProductImage();
  }

  openProductModal(true);
}

function setSampleImage(cat) {
  let sampleUrl = '';
  if (cat === 'coffee') {
    sampleUrl = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
  } else if (cat === 'tea') {
    sampleUrl = 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80';
  } else if (cat === 'iceblended') {
    sampleUrl = 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80';
  }
  document.getElementById('prodImageInput').value = sampleUrl;
  document.getElementById('prodImagePreview').src = sampleUrl;
  document.getElementById('prodImagePreviewWrapper').classList.remove('hidden');
}

async function handleSaveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('prodEditId').value;
  const name = document.getElementById('prodNameInput').value.trim();
  const category = document.getElementById('prodCategoryInput').value;
  const price = parseInt(document.getElementById('prodPriceInput').value, 10);
  const image = document.getElementById('prodImageInput').value.trim();
  const description = document.getElementById('prodDescInput').value.trim();
  const isBestSeller = document.getElementById('prodBestSellerInput').checked;

  if (!image) {
    alert('Vui lòng chọn hoặc tải lên ảnh cho món ăn/thức uống này.');
    return;
  }

  const productData = { id, name, category, price, image, description, isBestSeller };

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=save_product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
    } catch (err) {}
  }

  if (id) {
    const idx = state.products.findIndex(p => p.id === id);
    if (idx > -1) state.products[idx] = productData;
  } else {
    productData.id = 'p' + Date.now();
    state.products.push(productData);
  }

  localStorage.setItem('the30_products', JSON.stringify(state.products));
  pushCloudEvent('SYNC_PRODUCTS', { products: state.products });
  closeProductModal();
  renderProducts();
  renderAdminProducts();
  showToast('Đã lưu và đồng bộ món ăn trên tất cả thiết bị!');
}

async function deleteProduct(productId) {
  if (!confirm('Bạn có chắc chắn muốn xóa món này khỏi thực đơn?')) return;

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=delete_product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: productId })
      });
    } catch (e) {}
  }

  state.products = state.products.filter(p => p.id !== productId);
  localStorage.setItem('the30_products', JSON.stringify(state.products));
  pushCloudEvent('SYNC_PRODUCTS', { products: state.products });
  renderProducts();
  renderAdminProducts();
  showToast('Đã xóa món khỏi thực đơn trên tất cả thiết bị.');
}

// 3. Quản lý Banner Quảng cáo (yêu cầu fit với ảnh upload)
function renderAdminBanners() {
  const container = document.getElementById('adminBannersList');
  if (!container) return;

  if (state.banners.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 bg-white p-8 rounded-xl text-center text-slate-400 border border-slate-200">
        Chưa có banner nào. Hãy bấm "Thêm banner mới"!
      </div>
    `;
    return;
  }

  container.innerHTML = state.banners.map(b => `
    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
      <div class="relative aspect-video bg-slate-100 overflow-hidden">
        <img src="${b.image}" alt="${b.title}" class="w-full h-full object-cover">
        ${b.badge ? `
          <span class="absolute top-2 left-2 bg-amber-400 text-brand-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
            ${b.badge}
          </span>
        ` : ''}
      </div>
      <div class="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="font-bold text-xs sm:text-sm text-slate-900">${b.title}</h4>
          <p class="text-xs text-slate-500 line-clamp-1">${b.subtitle || ''}</p>
        </div>
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs ${b.active !== false ? 'text-emerald-600 font-bold' : 'text-slate-400'}">
            ${b.active !== false ? '● Đang hiển thị' : '○ Tạm ẩn'}
          </span>
          <div class="space-x-1">
            <button onclick="toggleBannerActive('${b.id}')" class="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded text-slate-700">
              ${b.active !== false ? 'Ẩn' : 'Hiện'}
            </button>
            <button onclick="deleteBanner('${b.id}')" class="text-xs bg-rose-50 hover:bg-rose-100 text-rose-600 px-2 py-1 rounded">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function openBannerModal() {
  document.getElementById('bannerForm').reset();
  clearBannerImage();
  document.getElementById('bannerModal').classList.remove('hidden');
}

function closeBannerModal() {
  document.getElementById('bannerModal').classList.add('hidden');
  document.getElementById('bannerForm').reset();
  clearBannerImage();
}

async function handleSaveBanner(e) {
  e.preventDefault();
  const title = document.getElementById('bannerTitleInput').value.trim();
  const subtitle = document.getElementById('bannerSubtitleInput').value.trim();
  const badge = document.getElementById('bannerBadgeInput').value.trim();
  const image = document.getElementById('bannerImageInput').value.trim();

  if (!image) {
    alert('Vui lòng chọn hoặc tải lên ảnh Banner quảng cáo.');
    return;
  }

  const newBanner = {
    id: 'b' + Date.now(),
    title,
    subtitle,
    badge,
    image,
    active: true
  };

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=save_banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBanner)
      });
    } catch (err) {}
  }

  state.banners.push(newBanner);
  localStorage.setItem('the30_banners', JSON.stringify(state.banners));
  pushCloudEvent('SYNC_BANNERS', { banners: state.banners });
  closeBannerModal();
  renderBanners();
  renderAdminBanners();
  showToast('Đã thêm và đồng bộ banner quảng cáo mới!');
}

async function toggleBannerActive(bannerId) {
  const b = state.banners.find(x => x.id === bannerId);
  if (!b) return;
  b.active = b.active === false ? true : false;
  localStorage.setItem('the30_banners', JSON.stringify(state.banners));
  pushCloudEvent('SYNC_BANNERS', { banners: state.banners });
  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=save_banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(b)
      });
    } catch (e) {}
  }
  renderBanners();
  renderAdminBanners();
}

async function deleteBanner(bannerId) {
  if (!confirm('Bạn có chắc chắn muốn xóa banner này?')) return;
  state.banners = state.banners.filter(x => x.id !== bannerId);
  localStorage.setItem('the30_banners', JSON.stringify(state.banners));
  pushCloudEvent('SYNC_BANNERS', { banners: state.banners });
  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=delete_banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: bannerId })
      });
    } catch (e) {}
  }
  renderBanners();
  renderAdminBanners();
  showToast('Đã xóa banner trên tất cả thiết bị!');
}

// 4. Cài đặt Quán & QR
function populateSettingsForm() {
  document.getElementById('settingStoreName').value = state.settings.storeName || 'The 30 - Coffee & Tea';
  document.getElementById('settingHotline').value = state.settings.hotline || '0949551441 - 0949789483';
  document.getElementById('settingBankCode').value = state.settings.bankCode || 'ICB';
  document.getElementById('settingBankAccount').value = state.settings.bankAccount || '100880871374';
  document.getElementById('settingBankAccountName').value = state.settings.bankAccountName || 'THE30s_COFFEE';
  document.getElementById('settingQrImageUrl').value = state.settings.qrImageUrl || '';
  document.getElementById('settingAdminPin').value = state.settings.adminPin || '123456';
}

async function handleSaveSettings(e) {
  e.preventDefault();
  state.settings.storeName = document.getElementById('settingStoreName').value.trim();
  state.settings.hotline = document.getElementById('settingHotline').value.trim();
  state.settings.bankCode = document.getElementById('settingBankCode').value.trim() || 'ICB';
  state.settings.bankAccount = document.getElementById('settingBankAccount').value.trim() || '100880871374';
  state.settings.bankAccountName = document.getElementById('settingBankAccountName').value.trim() || 'THE30s_COFFEE';
  state.settings.qrImageUrl = document.getElementById('settingQrImageUrl').value.trim();
  state.settings.adminPin = document.getElementById('settingAdminPin').value.trim() || '123456';
  state.settings.settingsVersion = SETTINGS_SCHEMA_VERSION;

  if (isPhpBackendAvailable === true) {
    try {
      await fetch(`${API_URL}?action=save_settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.settings)
      });
    } catch (err) {}
  }

  localStorage.setItem('the30_settings', JSON.stringify(state.settings));
  pushCloudEvent('SYNC_SETTINGS', { settings: state.settings });
  showToast('Đã lưu và đồng bộ cài đặt trên tất cả thiết bị!');
}

// Tự động khởi chạy ứng dụng khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
