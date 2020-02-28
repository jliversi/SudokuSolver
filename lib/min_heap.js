class MinHeap {
    constructor() {
        this.nodes = [null];
    }

    getParentIdx(idx) {
        return Math.floor(idx / 2);
    }

    getLeftChildIdx(idx) {
        return idx * 2;
    }

    getRightChildIdx(idx) {
        return idx * 2 + 1;
    }

    insert(val) {
        this.nodes.push(val);
        this.sift(this.nodes.length - 1);
    }

    sift(idx) {
        if (idx === 1) return;
        let parentIdx = this.getParentIdx(idx);

        if (this.nodes[idx] < this.nodes[parentIdx]) {
            [ this.nodes[idx], this.nodes[parentIdx] ] = [ this.nodes[parentIdx], this.nodes[idx] ];
            this.sift(parentIdx);
        }
    }
}