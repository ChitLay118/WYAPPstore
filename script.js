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
        // ... အခြား app data များကို အလိုက်ထည့်ပါ
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
