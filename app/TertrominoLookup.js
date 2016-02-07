export default class TertrominoLookup {
    static get tetrominoMap() {
        let map = new Map();

        map.set('i', {size: 4, blockList: [0x0F00, 0x2222, 0x00F0, 0x4444], color: 'cyan'});
        map.set('j', {size: 3, blockList: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'});
        map.set('l', {size: 3, blockList: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange'});
        map.set('o', {size: 2, blockList: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow'});
        map.set('s', {size: 3, blockList: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'});
        map.set('t', {size: 3, blockList: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple'});
        map.set('z', {size: 3, blockList: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'});

        return map
    }
}