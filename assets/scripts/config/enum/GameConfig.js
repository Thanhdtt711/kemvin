/**
 * Created by Nofear on 9/25/2017.
 */

(function () {
    cc.GameConfig = cc.Enum({
        ALL: '-1',
        BUNDLE_ALL: 'bundles',
        TAI_XIU: '8',
        TAI_XIU_BUNDLE: 'taixiu',
        TAI_XIU_PREFAB: 'taixiu/prefabs/taixiuView',

        XOC_XOC: '63',
        XOC_XOC_BUNDLE: 'xocxoc',
        XOC_XOC_PREFAB: 'xocxoc/prefabs/xocxocView',

        VQMM: '10',
        VQMM_BUNDLE: 'VQMM_BUNDLE',
        VQMM_PREFAB: 'VQMM_PREFAB',

        MINI_POKER: '11',
        MINI_POKER_BUNDLE: 'minipoker',
        MINI_POKER_PREFAB: 'minipoker/prefabs/minipokerView',

        SEVEN77: '7',
        SEVEN77_BUNDLE: 'game777',
        SEVEN77_PREFAB: 'game777/prefabs/777View',

        BLOCK_BUSTER: '12',
        BLOCK_BUSTER_BUNDLE: 'tq',
        BLOCK_BUSTER_PREFAB: 'tq/prefabs/tqView',

        LUCKY_WILD: '13',
        LUCKY_WILD_BUNDLE: 'luckyWild',
        LUCKY_WILD_PREFAB: 'luckyWild/prefabs/lwView',

        THREE_KINGDOM: '2',
        THREE_KINGDOM_BUNDLE: 'tk',
        THREE_KINGDOM_PREFAB: 'tk/prefabs/tkView',

        EGYPT: '4',
        EGYPT_BUNDLE: 'egypt',
        EGYPT_PREFAB: 'egypt/prefabs/egyptView',

        AQUARIUM: '1',
        AQUARIUM_BUNDLE: 'aquarium',
        AQUARIUM_PREFAB: 'aquarium/prefabs/aquariumView',

        DRAGON_BALL: '15',
        DRAGON_BALL_BUNDLE: 'dragonball',
        DRAGON_BALL_PREFAB: 'dragonball/prefabs/dbView',

        BUM_BUM: '24',
        BUM_BUM_BUNDLE: 'bb',
        BUM_BUM_PREFAB: 'bb/prefabs/bbView',

        COWBOY: '3',
        COWBOY_BUNDLE: 'cowboy',
        COWBOY_PREFAB: 'cowboy/prefabs/cbView',

        MONKEY: '90',
        MONKEY_BUNDLE: 'monkey',
        MONKEY_PREFAB: 'monkey/prefabs/monkeyView',

        GAINHAY: '17',
        GAINHAY_BUNDLE: 'GAINHAY_BUNDLE',
        GAINHAY_PREFAB: 'GAINHAY_PREFAB',

        DRAGON_TIGER: '14',
        DRAGON_TIGER_BUNDLE: 'dragontiger',
        DRAGON_TIGER_PREFAB: 'dragontiger/prefabs/dragonTigerView',

        BACCARAT: '19',
        BACCARAT_BUNDLE: 'bacarat',
        BACCARAT_PREFAB: 'bacarat/prefabs/BaCaratView',

        BA_CAY: '51',
        BA_CAY_BUNDLE: 'bacay',
        BA_CAY_PREFAB: 'bacay/prefabs/3CLobby',

        PHOM: '52',
        PHOM_BUNDLE: 'PHOM_BUNDLE',
        PHOM_PREFAB: 'PHOM_PREFAB',

        POKER_HK: '53',
        POKER_HK_BUNDLE: 'POKER_HK_BUNDLE',
        POKER_HK_PREFAB: 'POKER_HK_PREFAB',

        TIEN_LEN_MN: '54',
        TIEN_LEN_MN_BUNDLE: 'tienlenMN',
        TIEN_LEN_MN_PREFAB: 'tienlenMN/prefabs/TLMNLobby',

        MAU_BINH: '55',
        MAU_BINH_BUNDLE: 'maubinh',
        MAU_BINH_PREFAB: 'maubinh/prefabs/MBLobby',

        TIEN_LEN_MB: '56',
        TIEN_LEN_MB_BUNDLE: 'TIEN_LEN_MB_BUNDLE',
        TIEN_LEN_MB_PREFAB: 'TIEN_LEN_MB_PREFAB',

        POKER_TEXAS: '57',
        POKER_TEXAS_BUNDLE: 'poker',
        POKER_TEXAS_PREFAB: 'poker/prefabs/pokerView',

        SAM_LOC: '58',
        SAM_LOC_BUNDLE: 'SAM_LOC_BUNDLE',
        SAM_LOC_PREFAB: 'SAM_LOC_PREFAB',

        LIENG: '59',
        LIENG_BUNDLE: 'LIENG_BUNDLE',
        LIENG_PREFAB: 'LIENG_PREFAB',

        CHAN: '60',
        CHAN_BUNDLE: 'CHAN_BUNDLE',
        CHAN_PREFAB: 'CHAN_PREFAB',

        BA_CAY_GA: '61',
        BA_CAY_GA_BUNDLE: 'BA_CAY_GA_BUNDLE',
        BA_CAY_GA_PREFAB: 'BA_CAY_GA_PREFAB',

        BA_CAY_BIEN: '62',
        BA_CAY_BIEN_BUNDLE: 'BA_CAY_BIEN_BUNDLE',
        BA_CAY_BIEN_PREFAB: 'BA_CAY_BIEN_PREFAB',

        BAUCUA: '20',
        BAUCUA_BUNDLE: 'baucua',
        BAUCUA_PREFAB: 'baucua/prefabs/BauCuaView',

        TIEN_LEN_MN_NHAT_AN_TAT: '64',
        TIEN_LEN_MN_NHAT_AN_TAT_BUNDLE: 'TIEN_LEN_MN_NHAT_AN_TAT_BUNDLE',
        TIEN_LEN_MN_NHAT_AN_TAT_PREFAB: 'TIEN_LEN_MN_NHAT_AN_TAT_PREFAB',

        MAYA_QUEST: '65',
        MAYA_QUEST_BUNDLE: 'MAYA_QUEST_BUNDLE',
        MAYA_QUEST_PREFAB: 'MAYA_QUEST_PREFAB',

        TIEN_LEN_MN_SOLO: '66',
        TIEN_LEN_MN_SOLO_BUNDLE: 'tienlenMNSoLo',
        TIEN_LEN_MN_SOLO_PREFAB: 'tienlenMNSoLo/prefabs/TLMNSoLoLobby',

        SAM_LOC_SOLO: '67',
        SAM_LOC_SOLO_BUNDLE: 'SAM_LOC_SOLO_BUNDLE',
        SAM_LOC_SOLO_PREFAB: 'SAM_LOC_SOLO_PREFAB',

        LODE: '21',
        LODE_BUNDLE: 'lode',
        LODE_PREFAB: 'lode/prefabs/LoDeLobby',

        VIETLOT: '22',
        VIETLOT_BUNDLE: 'vietlot',
        VIETLOT_PREFAB: 'vietlot/prefabs/VietlotView',

        SHOOT_FISH: '23',
        SHOOT_FISH_BUNDLE: 'shootFish',
        SHOOT_FISH_PREFAB: 'shootFish/prefabs/ShootFish',

        THUONG_HAI: '16',
        THUONG_HAI_BUNDLE: 'THUONG_HAI_BUNDLE',
        THUONG_HAI_PREFAB: 'THUONG_HAI_PREFAB',

        EVENT_TREASURE: 'EVENT_TREASURE'
    });

}).call(this);
