import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { CartItem } from './CartItem'
import type { ItemInTheCartModel } from '../../../models/cartModel'
import type { ProductModel, SpecificationModel } from '../../../models/ProductModel'
import type { ProductType, ProductTypeParameter } from '../../../models/ProductType'
import userEvent from '@testing-library/user-event'

// mock contexs
const removeMock = vi.fn()
const setQtyMock = vi.fn()
const pushToastMock = vi.fn()

vi.mock('../../../contexts/CartContext', () => ({
  useCart: () => ({
    remove: removeMock,
    setQty: setQtyMock
  })
}))

vi.mock('../../../contexts/ToastContext', () => ({
  useToast: () => ({
    pushToast: pushToastMock
  })
}))

const specificationMock: SpecificationModel = {
    id: "1",
    title: "test specyfication",
    value: "test"
}

const productparameterMock: ProductTypeParameter = {
    id: 1,
    name: "test parameter",
    type: 'input'
}

const productTypeMock : ProductType = {
    title: "test type",
    key: "test",
    id: 1,
    parameters: [productparameterMock]
}

const productMock: ProductModel = {
    title: "test product",
    price: 20,
    oldPrice: -1,
    currency: "USD",
    description: "Test description",
    image: "testImage.jpg",
    id: 1,
    specifications: [specificationMock],
    productType: productTypeMock
}

const itemMock: ItemInTheCartModel = {
  quantity: 2,
  item: productMock
}

describe('CartItem', () => {

  const user = userEvent.setup();

  it('renders product title and quantity', () => {
    render(<CartItem item={itemMock} />)

    expect(screen.getByText('test product')).toBeInTheDocument()
    expect(screen.getByTestId('cart-product-quantity')).toHaveTextContent('2')
  })

  it('increments quantity when + clicked', async () => {
    render(<CartItem item={itemMock} />)

    await user.click(screen.getByTestId('cart-increment-product'))

    expect(setQtyMock).toHaveBeenCalledWith(1, 3)
  })

  it('decrements quantity when - clicked', async () => {
    render(<CartItem item={itemMock} />)

    await user.click(screen.getByTestId('cart-decrement-product'))

    expect(setQtyMock).toHaveBeenCalledWith(1, 1)
  })

  it('removes item and shows toast when X clicked', async () => {
    render(<CartItem item={itemMock} />)

    await user.click(screen.getByTestId('cart-remove-product'))

    expect(removeMock).toHaveBeenCalledWith(1)
    expect(pushToastMock).toHaveBeenCalledWith('Item removed from the cart.')
  })

})