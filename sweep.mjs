import { chromium, firefox, webkit } from 'playwright';
const ROUTES="/ /adn /adn-1 /adn-1-in-action /adn-in-action /blog /blog/beyond-the-buzzer /blog/the-796-billion-problem /brief /brief/newsletter /certification /contact /economic-sterilisation /enterprise /evidence /founder /glossary/economic-sterilisation /how-it-works /howitworks /investors /michael-esema /overview /pilot /press /privacy /protocol /roadmap /signal /signal/cctv-313-million-movie-ticket /signal/clinical /signal/coop-named-the-enemy-economics-unchanged /signal/david-robinson-gmb-cctv-theatre /signal/facial-recognition-evidence /signal/fog-security-systems-debunked /signal/magazine /signal/marking-evidence /signal/masthead /signal/newsletter /signal/police-200-pound-threshold /signal/safergems-jewellery-theft-ai-police-response /signal/salford-to-vinted-black-market /signal/shopkeeper-maths-adn-cost /signal/shoplifting-133-percent-london-1-in-14 /signal/surgeon-not-camera-200ms /signal/threshold-repealed-still-law /state-of-theft /subscribe /technology/adn-1 /technology/ats /terms /thesis".split(' ');
const VP=[{n:'mob',w:375,h:812},{n:'tab',w:768,h:1024},{n:'desk',w:1440,h:900}];
const CREAM=/rgb\((25[0-5]|24[0-9]),\s*(24[0-9]|25[0-5]),\s*(23[0-9]|24[0-5])\)/;
const B={chromium,firefox,webkit}; const fails=[]; let ok=0;
for(const [bn,bt] of Object.entries(B)){
  const br=await bt.launch();
  for(const vp of VP){
    const ctx=await br.newContext({viewport:{width:vp.w,height:vp.h}});
    const pg=await ctx.newPage();
    for(const r of ROUTES){
      try{
        await pg.goto('http://localhost:4188'+r,{waitUntil:'domcontentloaded',timeout:15000}); await pg.waitForTimeout(220);
        const d=await pg.evaluate(()=>{
          // the painted ground: first element with a non-transparent background
          const cands=[document.querySelector('main'),...document.querySelectorAll('#root>div,#root>div>div')].filter(Boolean);
          const grounds=cands.map(e=>getComputedStyle(e).backgroundColor)
            .filter(c=>c && c!=='rgba(0, 0, 0, 0)' && c!=='transparent');
          return {ow:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
                  grounds:[...new Set(grounds)].slice(0,4)};
        });
        if(d.ow>d.cw+1) fails.push(`OVERFLOW ${bn}/${vp.n} ${r} ${d.ow}>${d.cw}`);
        const creamy=d.grounds.filter(g=>CREAM.test(g)&&g!=='rgb(255, 255, 255)');
        if(creamy.length) fails.push(`CREAM ${bn}/${vp.n} ${r} ${creamy.join(',')}`);
        if(!fails.length||!fails[fails.length-1].includes(r)) ok++;
      }catch(e){ fails.push(`ERR ${bn}/${vp.n} ${r} ${e.message.split('\n')[0].slice(0,45)}`); }
    }
    await ctx.close();
  }
  await br.close(); console.log(bn+' done');
}
console.log(`checked ${ROUTES.length} routes x 3 viewports x 3 browsers = ${ROUTES.length*9}`);
console.log(fails.length?`FAILURES (${fails.length}):\n`+[...new Set(fails)].slice(0,20).join('\n'):'NO FAILURES');
