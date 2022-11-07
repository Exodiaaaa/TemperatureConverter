const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" },
];
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleIsStockedChange = this.handleIsStockedChange.bind(this);
  }
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  handleIsStockedChange(e) {
    this.props.onStockedChange(e.target.checked);
  }
  render() {
    const { filterText, isStocked } = this.props;
    return (
      <div className="mb-3">
        <div className="form-group mb-0">
          <input
            type="text"
            value={filterText}
            className="form-control"
            placeholder="Search..."
            onChange={this.handleFilterTextChange}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={isStocked}
            className="form-check-input"
            id="stock"
            onChange={this.handleIsStockedChange}
          />
          <label htmlFor="checked">Only Show products in stock</label>
        </div>
      </div>
    );
  }
}
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "foot",
      isStocked: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleIsStockedChange = this.handleIsStockedChange.bind(this);
  }

  handleFilterTextChange(filterText) {
    this.setState({
      filterText,
    });
  }
  handleIsStockedChange(isStocked) {
    this.setState({
      isStocked,
    });
  }
  render() {
    const { products } = this.props;
    return (
      <React.Fragment>
        <SearchBar
          filterText={this.state.filterText}
          isStocked={this.state.isStocked}
          onFilterTextChange={this.handleFilterTextChange}
          onStockedChange={this.handleIsStockedChange}
        />
        <ProductTable
          products={products}
          filterText={this.state.filterText}
          isStocked={this.state.isStocked}
        />
      </React.Fragment>
    );
  }
}
function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    // <span style={{ color: "red" }}>{product.name}</span>
    <span className="text-danger">{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
function ProductCategoryRow({ category }) {
  return <th colspan="2">{category}</th>;
}
function ProductTable({ products, isStocked, filterText }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      (isStocked && !product.checked) ||
      product.name.indexOf(filterText) === -1
    ) {
      return;
    }
    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow key={lastCategory} category={product.category} />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
  });
  return (
    <table className="table">
      <thead>
        <th>Name</th>
        <th>Price</th>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.querySelector("#app")
);
