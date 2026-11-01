/**
 * Serverless Backend Relay cho ApiPay (Hỗ trợ Vercel / Node.js Hosting)
 * Kết nối trực tiếp tới https://app.apipay.vn/v1 với tài khoản VietinBank 100880871374 (THE30s_COFFEE)
 */

const APIPAY_ACCESS_KEY = '89c1dddbdf3378cbf20e319b3f6111847a7c251f173900f9866a5a791ac3260c';
const APIPAY_SECRET_KEY = '59h4pFKdXKV5AFam3nikR0OYVX/ewcOzkuxIm9ZPLnBZUN2uzEM0F4KzPT15NtkPslLHhTubfyfGtB3m+XDvQA==';
const APIPAY_BANK_PUBLIC_ID = 'cmvxjzmx504zt01mtsg7gr1by';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = Buffer.from(`${APIPAY_ACCESS_KEY}:${APIPAY_SECRET_KEY}`).toString('base64');
  const action = req.query.action || '';

  try {
    if (action === 'create_payment' && req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const orderId = body.orderId || ('ORD-' + Date.now());
      const amount = String(parseInt(body.amount || 0, 10));

      const response = await fetch('https://app.apipay.vn/v1/client/payment-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bankPublicId: APIPAY_BANK_PUBLIC_ID,
          amount,
          content: `THE30 ${orderId}`,
          title: `Don hang ${orderId} - The 30 Coffee`
        })
      });

      const data = await response.json();
      return res.status(200).json({
        success: Boolean(data && data.data),
        apipay: data ? data.data : null
      });
    }

    if (action === 'check_payment') {
      const publicId = req.query.publicId || '';
      const orderId = req.query.orderId || '';

      if (publicId) {
        const response = await fetch(`https://app.apipay.vn/v1/payment-requests/${encodeURIComponent(publicId)}`);
        const data = await response.json();
        const status = data && data.data && data.data.status ? String(data.data.status).toUpperCase() : '';
        const isPaid = ['COMPLETED', 'PAID', 'SUCCESS', 'DONE'].includes(status);
        return res.status(200).json({
          success: true,
          paid: isPaid,
          status,
          data: data ? data.data : null
        });
      }

      // Tìm theo danh sách payment-requests gần nhất nếu chỉ có orderId
      const listRes = await fetch('https://app.apipay.vn/v1/client/payment-requests?page=1&limit=15', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const listJson = await listRes.json();
      const items = (listJson && listJson.data && Array.isArray(listJson.data.data)) ? listJson.data.data : [];
      const cleanOrder = String(orderId).replace(/-/g, '').toUpperCase();
      const matched = items.find(item => {
        const cleanContent = String(item.content || '').replace(/-/g, '').toUpperCase();
        return cleanOrder && cleanContent.includes(cleanOrder);
      });

      if (matched) {
        const st = String(matched.status || '').toUpperCase();
        const isPaid = ['COMPLETED', 'PAID', 'SUCCESS', 'DONE'].includes(st);
        return res.status(200).json({
          success: true,
          paid: isPaid,
          status: st,
          data: matched
        });
      }

      return res.status(200).json({ success: true, paid: false });
    }

    return res.status(400).json({ success: false, message: 'Invalid action' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
