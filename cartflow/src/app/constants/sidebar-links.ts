export const SidebarLinks = {
  admin: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/admin' },
    {icon: "fa-solid  fa-sitemap", label: 'Manage Products', path: '/admin/products' },
    {icon: "fa-solid fa-list-ul", label: 'Manage Categories', path: '/admin/categories' },
    {icon: "fa-solid fa-cart-plus", label: 'Manage Orders', path: '/admin/orders' },
    {icon: "fa-solid fa-users", label: 'Manage Users', path: '/admin/users' },
    {icon: "fa-solid fa-cash-register", label: 'Settings', path: '/admin/settings' },
  ],
  customer: [
    {icon: "fa-solid fa-layer-group",  label: 'Dashboard', path: '/customer' },
    {icon: "fa-solid fa-cart-plus", label: 'My Cart', path: '/customer/cart' },
     {icon: "fa-solid  fa-list", label: 'My Orders', path: '/customer/my-orders' },
    {icon: "fa-solid  fa-sitemap", label: 'Continue Shopping', path: '/' },
    { icon: "fa-solid fa-user",label: 'My Profile', path: '/customer/profile' },
  ],
};




