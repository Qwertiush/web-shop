import { render, screen } from "@testing-library/react";
import { Cart } from "./Cart";
import userEvent from "@testing-library/user-event";
import type { CartState } from "../../models/cartModel";

let cartMock: CartState = {}
const clearMock = vi.fn()

let preferencesMock = {
    theme: 'light',
    currency: 'USD'
}
const pushToastMock = vi.fn()

vi.mock('../../contexts/CartContext', () => ({
    useCart: () => ({
        cart: cartMock,
        clear: clearMock
    })
}))

vi.mock('../../contexts/PreferencesContext', () => ({
    usePreferences: () => ({
        preferences: preferencesMock
    })
}))

vi.mock('../../contexts/ToastContext', () => ({
    useToast: () => ({
        pushToast: pushToastMock
    })
}))

vi.mock('../../data/dummyDB/dbAPI', () => ({
  fetchItemById: vi.fn().mockImplementation( async (id: number) => ({
    id,
    title: "Test product",
    price: 10,
    currency: "USD",
    image: "404",
    description: "test description",
    oldPrice: -1,
    specifications: [],
    productType: { id: 1, title: "test title", key: "test key", parameters: [] }
  }))
}))

const cartStateMock: CartState = {
    2:2,
    3:1
}

const emptyCartStateMock: CartState = {}

describe('Cart', () =>{
    
    const user = userEvent.setup();

    beforeEach(() => {
        cartMock = {}
        vi.clearAllMocks()
    })

    it('renders cart, checks if there is information about empty cart', async () => {
        cartMock = emptyCartStateMock;
        
        render(<Cart/>)

        expect(await screen.findByText(/your cart is empty/i)).toBeInTheDocument()
    })

    it('renders cart, checks if there is information about empty cart', async () => {
        cartMock = cartStateMock;
        
        render(<Cart/>)

        await screen.findByRole('button', {name: /checkout button/i})
        
        expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument()
    })

    it('clears cart', async () => {
        cartMock = cartStateMock;

        render(<Cart/>)

        await screen.findByText(/Checkout/i)

        await user.click(screen.getByText(/Clear/i))

        expect(clearMock).toHaveBeenCalled();

    })

    it('goes to checkout', async () => {
        cartMock = cartStateMock;

        render(<Cart/>)

        await screen.findByText(/Checkout/i)

        await user.click(screen.getByText(/Checkout/i))

        expect(pushToastMock).toHaveBeenCalledWith("Sorry, those items are unavalible for purchase. :(")
    })

    it('goes to checkout with empty cart', async () => {
        cartMock = emptyCartStateMock;

        render(<Cart/>)

        await screen.findByText(/Checkout/i)

        await user.click(screen.getByText(/Checkout/i))

        expect(pushToastMock).toHaveBeenCalledWith("Cart is empty, In those parts of the world this is considered an invalid transaction. :(",8000)
    })
})