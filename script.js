document.addEventListener('DOMContentLoaded', () => {
    const featuredContainer = document.getElementById('featured-app-list-container');
    const allContainer = document.getElementById('all-app-list-container');
    const categoryNav = document.getElementById('category-nav');
    const searchInput = document.getElementById('search-input');

    let currentFilter = 'All Apps';
    let currentSearchTerm = '';
    let featuredIndex = 0;

    const dummyApps = [
        {id:1,name:'Netflix Premium',description:'အကန့်အသတ်မရှိ ရုပ်ရှင်နှင့် တီဗီရှိုးများကြည့်ရှုရန်',size:'69.8 MB',rating:4.9,category:'Entertainment',isFeatured:true,iconUrl:'https://modyolo.com/wp-content/uploads/2021/09/netflix-150x150.jpg',bgImageUrl:'https://i.ibb.co/jkqNvDqR/pexels-dreamypixel-547114.jpg',downloadUrl:'https://files.modyolo.com/Netflix./Netflix%20v9.34.0%20MOD.apk'},
        {id:2,name:'Spotify Premium',description:'ကြော်ငြာမပါဘဲ အကန့်အသတ်မရှိ သီချင်းနားဆင်ရန်',size:'52.4 MB',rating:4.7,category:'Entertainment',isFeatured:true,iconUrl:'https://modyolo.com/wp-content/uploads/2021/11/spotify-apk-mod-premium-150x150.png',bgImageUrl:'https://i.ibb.co/dstKxsX4/pexels-mccutcheon-1191710.jpg',downloadUrl:'https://files.modyolo.com/Spotify/Spotify_%20v9.0.82.1008%20x.xapk'},
        {id:3,name:'WY AppStore',description:'ပြုပြင်ထားသော အက်ပ်များကို ရှာဖွေပြီး ဒေါင်းလုတ်ဆွဲရန်',size:'15.2 MB',rating:4.0,category:'Modified Apps',isFeatured:true,iconUrl:'https://i.ibb.co/PzxgMt7N/photo-2025-09-18-00-58-09.jpg',bgImageUrl:'https://i.ibb.co/XHJwdsm/pexels-umkreisel-app-956999.jpg',downloadUrl:'https://www.mediafire.com/file/n8ohx9xnfisynuw/WY_App_Store.apk/file'},
        {id:4,name:'Sketchware Pro',description:'Android အက်ပ်ဖန်တီးရန် ခေတ်မီ platform',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:true,iconUrl:'https://i.ibb.co/YB24757s/photo-2025-09-18-07-49-55.jpg',bgImageUrl:'https://i.ibb.co/YFQkwW8G/photo-2025-09-17-23-50-08.jpg',downloadUrl:'https://www.mediafire.com/file/7pi9zf551xbgiy8/Sketchware_pro.apk/file'}
        {id:5,name:'AIDE Pro 2.8',description:'မိုဘိုင်းအက်ပ်ဖန်တီးရန် Professional Android IDE',size:'31.2 MB',rating:4.4,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/8CPMDm7/photo-2025-09-18-07-50-07.jpg',downloadUrl:'https://www.mediafire.com/file/rh85g28nbmnur3f/AIDE_Pro_2.8.7-freely.apk/file'},
        {id:6,name:'Download Video No Watermark',description:'ဝဘ်ဆိုက်အမျိုးမျိုးမှ ဗီဒီယိုများဒေါင်းလုတ်ဆွဲရန်',size:'12.5 MB',rating:4.6,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/tTrfrTT2/photo-2025-09-18-10-04-51.jpg',downloadUrl:'https://www.mediafire.com/file/jcj5q0w5s4t6p3r/AhaTik_Downloader_Premium_v1.52.3_Modded_by_%2540Getmodpcs.apk/file'},
        {id:7,name:'IMDB Movies and TV Shows',description:'ဗီဒီယိုအားလုံးကို ကြည့်ရှုနိုင်သည်',size:'10.1 MB',rating:4.8,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/206dWSK6/photo-2025-09-18-11-23-21.jpg',downloadUrl:'https://www.mediafire.com/file/iehjn9emmv2pa2l/IMDb_Premium_v9.3.2.160259480_Modded_by_%2540Getmodpcs.apk/file'},
        {id:8,name:'သတင်းနှင့်ဇာတ်ကား',description:'သတင်း၊ ရုပ်ရှင်နှင့် ဗီဒီယိုများ ကြည့်ရှုရန်',size:'10.1 MB',rating:4.8,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/NRB7DRs/IMG-20250907-105744.png',downloadUrl:'https://www.mediafire.com/file/kz2cas0hpx4p2mz/%E1%80%9E%E1%80%90%E1%80%84%E1%80%BA%E1%80%B8%E1%80%94%E1%80%BE%E1%80%84%E1%80%BA%E1%80%B7%E1%80%87%E1%80%AC%E1%80%90%E1%80%BA%E1%80%80%E1%80%AC%E1%80%B8update.apk/file'},
        {id:9,name:'Netflix Premium',description:'အကန့်အသတ်မရှိ ရုပ်ရှင်နှင့် တီဗီရှိုးများကြည့်ရှုရန်',size:'69.8 MB',rating:4.9,category:'Entertainment',isFeatured:false,iconUrl:'https://modyolo.com/wp-content/uploads/2021/09/netflix-150x150.jpg',downloadUrl:'https://files.modyolo.com/Netflix./Netflix%20v9.34.0%20MOD.apk'},
        {id:10,name:'Spotify Premium',description:'ကြော်ငြာမပါဘဲ အကန့်အသတ်မရှိ သီချင်းနားဆင်ရန်',size:'52.4 MB',rating:4.7,category:'Entertainment',isFeatured:false,iconUrl:'https://modyolo.com/wp-content/uploads/2021/11/spotify-apk-mod-premium-150x150.png',downloadUrl:'https://files.modyolo.com/Spotify/Spotify_%20v9.0.82.1008%20x.xapk'},
        {id:11,name:'WY AppStore',description:'ပြုပြင်ထားသော အက်ပ်များကို ရှာဖွေပြီး ဒေါင်းလုတ်ဆွဲရန်',size:'15.2 MB',rating:4.0,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/PzxgMt7N/photo-2025-09-18-00-58-09.jpg',downloadUrl:'https://www.mediafire.com/file/n8ohx9xnfisynuw/WY_App_Store.apk/file'},
        {id:12,name:'Sketchware Pro',description:'Android အက်ပ်ဖန်တီးရန် ခေတ်မီ platform',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/YB24757s/photo-2025-09-18-07-49-55.jpg',downloadUrl:'https://www.mediafire.com/file/7pi9zf551xbgiy8/Sketchware_pro.apk/file'},
        {id:13,name:'Tiktok',description:'tiktok',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://modyolo.com/wp-content/uploads/2021/09/tiktok-150x150.jpg',downloadUrl:'https://files.modyolo.com/TikTok/TikTok_%20v41.8.15%20_MOD.apk'},
        {id:14,name:'AllKaBar', description:'myanmarxxn',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/yFYd4rgz/photo-2025-09-17-18-24-51.jpg',downloadUrl:'https://www.mediafire.com/file/wa3j36uolt9r8wx/AllKaBar.apk/file'},
        {id:15,name:'မြန်မာဟင်းချက်နည်းများ',description:'မြန်မာအစားအစာ ချက်ပြုတ်နည်းပေါင်းစုံ',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/YFQkwW8G/photo-2025-09-17-23-50-08.jpg',downloadUrl:'https://www.mediafire.com/file/gd0zxwuz1o58nuk/%25E1%2580%2599%25E1%2580%25BC%25E1%2580%2594%25E1%2580%25BA%25E1%2580%2599%25E1%2580%25AC%25E1%2580%259F%25E1%2580%2584%25E1%2580%25BA%25E1%2580%25B8%25E1%2580%2581%25E1%2580%25BB%25E1%2580%2580%25E1%2580%25BA%25E1%2580%2594%25E1%2580%258A%25E1%2580%25BA%25E1%2580%25B8.apk/file'},
        {id:16,name:'AIDE_3.2',description:'Android အက်ပ်ဖန်တီးရန်',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/cXQ8Xv7Q/photo-2025-09-18-07-50-00.jpg',downloadUrl:'https://www.mediafire.com/file/50xmjvul6rn6mwq/AIDE_3.2.191010-2.3.5.apk/file'},
        {id:17,name:'AIDE studio pro',description:'Android အက်ပ်ဖန်တီးရန်',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/Hkc3XGd/photo-2025-09-18-07-50-13.jpg',downloadUrl:'https://www.mediafire.com/file/o9mew8gh9e4r3g5/Aide_studio_pro.apk/file'},
        {id:18,name:'Developer Color Tool',description:'create color',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/HD9Fx72P/photo-2025-09-18-09-44-54.jpg',downloadUrl:'https://www.mediafire.com/file/oqy8bv69x90hk71/Developer_Color_Tool_1.2.apk/file'},
        {id:19,name:'Material Icon Maker',description:'create icon',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/5WDs2Pgp/photo-2025-09-18-09-44-43.jpg',downloadUrl:'https://www.mediafire.com/file/lt8hgmua19ua4ij/Material_Icon_Maker.apk/file'},
        {id:20,name:'AndroidExample',description:'create',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/nMq2ND9J/photo-2025-09-18-09-44-48.jpg',downloadUrl:'https://www.mediafire.com/file/w91gd7bp80mpdyh/AndroidExample_1.1.apk/file'},
        {id:21,name:'Ai Video Generator',description:'mode ai',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/PZsPMHMX/photo-2025-09-18-10-22-02.jpg',downloadUrl:'https://www.mediafire.com/file/nz7f0gdfjhat5vm/Ai_Video_Generator.apk/file'},
        {id:22,name:'ADV Screen Recorder',description:'Recorder',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/G42Pv4Sn/photo-2025-09-18-11-22-56.jpg',downloadUrl:'https://www.mediafire.com/file/blsc8tudn5nmp7z/ADV_Screen_Recorder_Pro_v4.25.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:23,name:'InShot',description:'Video Editor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/PzDdC4qT/photo-2025-09-18-11-23-14.jpg',downloadUrl:'https://www.mediafire.com/file/c2fy4cqbjozpju1/InShot_Pro_v2.653.1753_Modded_by_%2540Getmodpcs.apk/file'},
        {id:24,name:'MoviesHub',description:''ဗီဒီယိုများ ကြည့်ရှုရန်',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/1G1CxCvL/photo-2025-09-18-11-23-30.jpg',downloadUrl:'https://www.mediafire.com/file/sek461p93u6xi9n/MOVIES_HUB_PREMIUM_v2.3.8d_Modded_by_%2540Getmodpcs.apk/file'},         {id:25,name:'live Flight Tracker',description:'modversion',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/gbwHMvvg/photo-2025-09-18-11-23-01.jpg',downloadUrl:'https://www.mediafire.com/file/qn1g8vmh5e6tisf/FLYMAT_PREMIUM_v1.0.75_Modded_by_%2540Getmodpcs.apk/file'},
        {id:26,name:'Device Info',description:'ViewInfo',size:'21.2 MB',rating:4.5,category:'Development',isFeatured:false,iconUrl:'https://i.ibb.co/RGYfr6pp/photo-2025-09-18-12-29-58.jpg',downloadUrl:'https://www.mediafire.com/file/yklcspohofralls/DevInfo_Pro_v3.4.0.1_Modded_by_%2540Getmodpcs.apk/file'},
        {id:27,name:'EasynotesVIP',description:'modversion',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/yFNFPzbK/photo-2025-09-18-12-29-54.jpg',downloadUrl:'https://www.mediafire.com/file/8xajn27cr1pyjuo/EasyNotes_VIP_v1.4.25.0934_Modded_by_%2540Getmodpcs.apk/file'},
        {id:28,name:'XScreen Recorder',description:'Recorder',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/SwFH8pzQ/photo-2025-09-18-12-29-50.jpg',downloadUrl:'https://www.mediafire.com/file/wswbqltg5zg9z6h/XRecorder_Pro_v2.8.7.5_Modded_by_%2540Getmodpcs.apk/file'},
        {id:29,name:'Uni TV Remote',description:'Remote',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/jkBgGnqz/photo-2025-09-18-12-29-29.jpg',downloadUrl:'https://www.mediafire.com/file/p6o8y0jelamh1pe/UniMote_Premium_v1.8.4_Modded_by_%2540Getmodpcs.apk/file'},
        {id:30,name:'PowerDirector-VideoEditor',description:'VideoEditor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/sdJf6N0S/photo-2025-09-18-12-29-34.jpg',downloadUrl:'https://www.mediafire.com/file/n34kwclc3vnlx4t/PowerDirector_Premium_v15.9.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:31,name:'Ai Photo Editor-Dofoto',description:'Photo Edito',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/1fgRyS4j/photo-2025-09-18-12-29-24.jpg',downloadUrl:'https://www.mediafire.com/file/c7la3ud63elknm2/DoFoto_AI_Photo_Editor_v1.285.89_Modded_by_%2540Getmodpcs.apk/file'},
        {id:32,name:'ShotCut Ai',description:'Editor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/V0qtzQRg/photo-2025-09-18-12-29-17.jpg',downloadUrl:'https://www.mediafire.com/file/ltes3y3qyt7o947/ShotCut_Premium_v3.12.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:33,name:'Vidma Ai-VideoEditor',description:'VideoEditor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/4R8mRsKP/photo-2025-09-18-12-29-38.jpg',downloadUrl:'https://www.mediafire.com/file/t7l0exm7p4is8xw/Vidma_Premium_v2.40.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:34,name:'CapCut pro',description:'အကုန်လုံးfreeသုံးပါ',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/CapCut%20%20MOD%20APK7.webp',downloadUrl:'https://getmodsapk.com/dl-track/capcut-pro-free-mod-apk/203326'},
        {id:35,name:'Spring',description:'Video Editor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/qMZXnKhQ/photo-2025-09-18-15-12-57.jpg',downloadUrl:'https://www.mediafire.com/file/e5w16wh5rodi0xi/Spring_Premium_v1.4.3.3537_Modded_by_%2540Getmodpcs.apk/file'},
        {id:36,name:'KingMaster',description:'Video Editor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/xPVJQ98/photo-2025-09-18-15-12-52.jpg',downloadUrl:'https://www.mediafire.com/file/9cghockewg7efoq/KineMaster_Premium_v7.8.5.3542.GP_Modded_by_%2540Getmodpcs.apk/file'},
        {id:37,name:'AllVideoDownloader',description:'Downloader',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/C5HfBgMq/photo-2025-09-18-15-12-48.jpg',downloadUrl:'https://www.mediafire.com/file/ebteevjdthbzzsj/All_Video_Downloader_v1.7.2_Modded_by_%2540Getmodpcs.apk/file'},
        {id:38,name:'Cartoon PhotoEditor',description:'PhotoEditor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/bMTdQ393/photo-2025-09-18-15-12-26.jpg',downloadUrl:'https://www.mediafire.com/file/6mjxwm5ie5wka3o/ToonTap_Pro_v1.50.89_Modded_by_%2540Getmodpcs.apk/file'},
        {id:39,name:'BesoccerPremium',description:'modversion',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/xtDd5G97/photo-2025-09-18-15-12-31.jpg',downloadUrl:'https://www.mediafire.com/file/5w8cx2u7xybw0uf/BeSoccer_Premium_v5.8.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:40,name:'TurboVPN Premium',description:'freePremium',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/ycfbQwfn/photo-2025-09-18-15-12-39.jpg',downloadUrl:'https://www.mediafire.com/file/gtltcs1mzki5c91/Turbo_VPN_Premium_v4.3.1.8_Modded_by_%2540Getmodpcs.apk/file'},
        {id:41,name:'PicsartPremium',description:'modversion',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/mrVk51Y5/photo-2025-09-18-15-12-22.jpg',downloadUrl:'https://www.mediafire.com/file/ri34hjh84h7456p/Picsart_Premium_Gold_v29.3.2_Modded_by_%2540Getmodpcs.apk/file'},
        {id:42,name:'Ai Chat Assistant',description:'modversion',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/hFvZrwB2/photo-2025-09-18-15-12-17.jpg',downloadUrl:'https://www.mediafire.com/file/51vqzemcoexyl6y/Chat_Smith_Premium_v8.251105.8_Modded_by_%2540Getmodpcs.apk/file'},
        {id:43,name:'Canva',description:'VideoEditor',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/PZ1GSxbs/download.jpg',downloadUrl:'https://www.mediafire.com/file/ngbm1qfsyge6fuh/Canva_v2.206.0_MOD.apk/file'},
        {id:44,name:'IPTV Pro',description:'modversion',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/ccrFcJC4/photo-2025-09-19-01-12-11.jpg',downloadUrl:'https://www.mediafire.com/file/anytgh5kaianout/IPTV_Pro_v9.3.5_Modded_by_%2540Getmodpcs.apk/file'},
        {id:45,name:'My Movie Premium',description:'Premium',size:'21.2 MB',rating:4.5,category:'Entertainment',isFeatured:false,iconUrl:'https://i.ibb.co/99mb8yc5/photo-2025-09-19-01-12-06.jpg',downloadUrl:'https://www.mediafire.com/file/l2p55wzq028j6nk/MyMovie_Premium_v14.13.5_Modded_by_%2540Getmodpcs.apk/file'},
        {id:46,name:'Telegram Premium',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/fd0r9r0j/photo-2025-09-19-01-11-43.jpg',downloadUrl:'https://www.mediafire.com/file/7ipy7brs863eywr/Telegram_Premium_v12.2.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:47,name:'VideoShowVIP',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://i.ibb.co/VXmztTY/photo-2025-09-19-01-11-55.jpg',downloadUrl:'https://www.mediafire.com/file/psh22x5opjxwo1h/VideoShow_VIP_v11.7.1.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:48,name:'AutoClicker',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/vCxVzcqL/photo-2025-09-19-01-12-01.jpg',downloadUrl:'https://www.mediafire.com/file/nru2908tnni49s9/Auto_Clicker_Pro_v2.6.0_Modded_by_%2540Getmodpcs.apk/file'},
        {id:49,name:'Chatgpt Premium',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/Sw6ctmTM/download.png',downloadUrl:'https://www.mediafire.com/file/uuzy14nlgqnc4pf/Ai-Chatbot-v5.2.0.2-MOD-OTR-%2528Getmodsapk.com%2529.apk/file'},
        {id:50,name:'TeraBox Cloud Storage',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://i.ibb.co/mrNs6MTk/photo-2025-09-19-01-42-56.jpg',downloadUrl:'https://files.modyolo.com/Terabox/TeraBox_%20v4.5.3%20_MOD.apk'},
        {id:51,name:'Alight Motion',description:'FreeVersion',size:'21.2 MB',rating:4.5,category:'Modified Apps',isFeatured:false,iconUrl:'https://play-lh.googleusercontent.com/OU0BlP8C9-V7ECl2crma7B48nzDbK7liSLjn0j_fpTlyWG6qyEE-mw_KFZ9aOXF0a3w=w100-h100-rw',downloadUrl:'https://file.apkdone.io/s/a8cFKqR8eGLmgew/download'},
        {id:52,name:'Tennis Clash v6.18.2 MOD APK',description:'game',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/media/2025/5/tennis-clash-mod-apk-1-1.webp',downloadUrl:'https://getmodsapk.com/dl-track/tennis-clash-3d-modded-apk/209666'},
        {id:53,name:'Cat Runner',description:'Unlimited Money/Gems',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/Cat-Runner-MOD-APK%20(2)1.webp',downloadUrl:'https://getmodsapk.com/dl-track/cat-runner-mod-apk/212522'},
        {id:54,name:'Hot Slide',description:'Unlimited Money/Unlocked',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/media/2025/9/hot-slide-mod-apk.webp',downloadUrl:'https://getmodsapk.com/dl-track/hot-slide-mod-apk/210984'},
        {id:55,name:'CarX Highway Racing',description:'Unlimited Money/VIP Unlocked',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/CarX%20Highway%20Racing%20MOD%20APK%20(1)0.webp',downloadUrl:'https://getmodsapk.com/dl-track/carx-highway-racing-apk-mod/211881'},
        {id:56,name:'Invasion: Aerial Warfare',description:'Unlimited Money/Energy',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/Invasion%20Modern%20Empire%20MOD%20APK4.webp',downloadUrl:'https://getmodsapk.com/dl-track/invasion-modern-empire-mod-apk/210877'},
        {id:57,name:'Tacticool',description:'Mod Menu/Unlimited Money',size:'21.2 MB',rating:4.5,category:'Utilities',isFeatured:false,iconUrl:'https://getmodsapk.com/storage/Tacticool%20MOD%20APK%20(1)3.webp',downloadUrl:'https://getmodsapk.com/dl-track/tacticool-mod-apk/210869'},
    ];

    const categories = ['All Apps', ...new Set(dummyApps.map(a=>a.category))];

    function renderCategories(){
        categoryNav.innerHTML = categories.map(cat => `
            <button class="px-4 py-2 mx-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer category-button ${currentFilter===cat?'bg-blue-600 text-white shadow-lg':'bg-gray-200 text-gray-700 hover:bg-gray-300'}" data-category="${cat}">
                ${cat==='All Apps'?'အက်ပ်အားလုံး':cat}
            </button>
        `).join('');
        document.querySelectorAll('.category-button').forEach(btn=>{
            btn.addEventListener('click',e=>{
                currentFilter=e.target.dataset.category;
                currentSearchTerm='';
                searchInput.value='';
                renderCategories();
                updateUI();
            });
        });
    }

    function renderAppCards(container, appsToRender, isFeatured=false){
        if(appsToRender.length===0){
            container.innerHTML=`<p class="text-center text-gray-500 col-span-full">အက်ပ်မတွေ့ပါ</p>`;
            return;
        }
        container.innerHTML = appsToRender.map(app => {
            if(isFeatured){
                return `
                <a href="${app.downloadUrl}" target="_blank" class="featured-card app-card flex-shrink-0 relative mr-4 rounded-xl overflow-hidden shadow-lg cursor-pointer">
                    <img src="${app.bgImageUrl}" alt="${app.name}" class="w-full h-48 object-cover">
                    <div class="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/70 to-transparent w-full text-white">
                        <h3 class="text-lg font-bold">${app.name}</h3>
                        <p class="text-sm">${app.description}</p>
                    </div>
                </a>`;
            }else{
                return `
                <div class="app-card bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <img src="${app.iconUrl}" alt="${app.name}" class="w-full h-32 object-contain p-2">
                    <div class="p-3 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 class="font-semibold text-sm mb-1">${app.name}</h3>
                            <p class="text-xs text-gray-500">${app.size} • ⭐${app.rating}</p>
                        </div>
                        <a href="${app.downloadUrl}" target="_blank" class="download-btn mt-3 block text-center bg-green-500 text-white py-1 rounded-full text-sm font-medium">ဒေါင်းလုပ်</a>
                    </div>
                </div>`;
            }
        }).join('');
    }

    function updateUI(){
        let filteredApps = dummyApps.filter(app=>{
            let matchCategory = currentFilter==='All Apps' || app.category===currentFilter;
            let matchSearch = !currentSearchTerm || app.name.toLowerCase().includes(currentSearchTerm.toLowerCase());
            return matchCategory && matchSearch;
        });
        renderAppCards(allContainer, filteredApps);
        renderAppCards(featuredContainer, filteredApps.filter(a=>a.isFeatured), true);
    }

    searchInput.addEventListener('input',e=>{
        currentSearchTerm=e.target.value;
        updateUI();
    });

    renderCategories();
    updateUI();

    // Featured Carousel Auto Scroll
    function startCarousel(){
        const cards = featuredContainer.children;
        if(cards.length===0) return;
        setInterval(()=>{
            featuredIndex++;
            if(featuredIndex>=cards.length) featuredIndex=0;
            cards[featuredIndex].scrollIntoView({behavior:'smooth',inline:'center'});
        },4000);
    }

    startCarousel();
});
