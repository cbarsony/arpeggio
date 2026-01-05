import { BEAT_WIDTH, BEATS_PER_BAR } from '../utils/constants.js';

/**
 * Timeline - renders bar markers at the top
 * Pure DOM implementation
 */
export class Timeline {
    constructor(container, midiState) {
        this.container = container;
        this.midiState = midiState;
        
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        
        const totalBars = this.midiState.bars;
        const barWidth = BEAT_WIDTH * BEATS_PER_BAR;
        
        // Set container width
        this.container.style.width = `${totalBars * barWidth}px`;
        
        for (let bar = 1; bar <= totalBars; bar++) {
            const barEl = document.createElement('div');
            barEl.className = 'timeline-bar';
            barEl.textContent = bar;
            barEl.setAttribute('role', 'listitem');
            barEl.setAttribute('aria-label', `Bar ${bar}`);
            this.container.appendChild(barEl);
        }
    }

    setScrollLeft(scrollLeft) {
        this.container.style.transform = `translateX(${-scrollLeft}px)`;
    }
}
