import { act, fireEvent, render, screen } from "@testing-library/react";
import { Toast } from "./Toast";

const messageMock = "test message";

const onCloseMock = vi.fn();

const durationMock = 4000;
const durationCheck = 3000;
const animationDurationMock = 1000;

describe('Toast', () => {

    it('renders toast whith provided message', () => {

        vi.useFakeTimers();
        
        render(<Toast message={messageMock} onClose={onCloseMock} duration={durationMock} />);

        expect(screen.getByText(messageMock)).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(durationCheck);
        });
        expect(screen.getByText(messageMock)).toBeInTheDocument();

        act(() => {
            vi.advanceTimersByTime(animationDurationMock);
        });
        expect(onCloseMock).toHaveBeenCalled();
    });

    it('closes the toast', async () => {

        vi.useFakeTimers();

        render(<Toast message={messageMock} onClose={onCloseMock} duration={durationMock} />);

        const button = screen.getByRole('button', {name: /close toast/i})

        act(() => {
            fireEvent.click(button);
            vi.advanceTimersByTime(animationDurationMock);
        })
        expect(onCloseMock).toHaveBeenCalled();
    });
})