export default function mountComponent(props) {
  return `component = mount(
      <MemoryRouter>
        <Component ${props} />
      </MemoryRouter>
    );`;
}
