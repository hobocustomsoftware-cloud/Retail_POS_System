export default function Products() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products & Variants</h1>
      <p>Manage products, attributes (Color/Size/Gender), variants with SKU/Barcode</p>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products & Variants</h1>
      <p>Manage products, attributes (Color/Size/Gender), variants with SKU/Barcode auto-generate</p>
      <div style={{ background: '#fff', padding: '1rem', border: '1px solid #e5e7eb' }}>
        <h3>Add Product</h3>
        <input placeholder="Product Name" style={{ padding: '0.5rem', marginRight: '0.5rem' }} />
        <button style={{ padding: '0.5rem 1rem' }}>Save</button>
      </div>
    </div>
  )
}
