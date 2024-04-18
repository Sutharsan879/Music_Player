const ad=document.querySelector('.song');
const playing=document.querySelector('.fa-play');
const pause=document.querySelector('.fa-pause');
const frd=document.querySelector('.fa-forward-fast');
const title=document.querySelector('.title');
const art_image=document.querySelector('#artlist');
const art_name=document.querySelector('#name');
const playSong=document.querySelector('#playsong');
const volumeSlider=document.getElementById('volumeSlider');
const songSlider=document.getElementById('songSlider');

const artistName=['Joe','Joe','Joe','Leo','Leo','Leo','Jailer','Jailer','Jailer','April Madhathil',' Vaaranam Aayiram',' Vaaranam Aayiram',' Vaaranam Aayiram',' Vaaranam Aayiram','Yaaradi Nee Mohini','Yaaradi Nee Mohini','Yaaradi Nee Mohini','Sai Abhyankkar','Anegan'];
const artistTitle=['Urugi Urugi','Kovai Kulira','Dimmu Dippu','Anbenum','Lokiverse 2.0','Naa Ready','Alappara Theme (Instrumental)','Hukum - Thalaivar Alappara','Rathamaarey','Sight Adipom','Adiyae Kolluthey','Ava Enna Enna','Nenjukkul Peidhidum','Yethi Yethi','Oru Naalaikkul','Engeyo Partha','Venmegam Pennaga','Katchi Sera','Aathadi Aathadi'];

playSong.addEventListener('click',effect)

document.addEventListener('keydown',function(event) 
{
    if(event.code==='Space') 
    {
        togglePlayPause();
    }
    else if(event.code==='ArrowUp') 
    {
        event.preventDefault();
        volumeUp();
    }
    else if(event.code==='ArrowDown') 
    {
        event.preventDefault();
        volumeDown();
    }
    else if(event.code==='ArrowRight') 
    {
        seekForward();
    }
    else if(event.code==='ArrowLeft') 
    {
        seekBackward();
    }
});

function effect()
{
    if(ad.duration==ad.currentTime)
    {
        x+=1;
        console.log(x);
    }

    if((!playing.classList.contains('none')))
    {
        ad.play();
        setInterval(prog,1000);
        setInterval(line,1000);
        progress.addEventListener('click',(e)=>{
            let sys=(e.offsetX/e.target.clientWidth)*ad.duration;
            ad.currentTime=sys;
        })
    }
    else
    {
        ad.pause();
    }

    updateVolumeSlider();
    ad.addEventListener('ended', playNextSong);

    title.classList.toggle('run');
    playing.classList.toggle('none');
    pause.classList.toggle('none');
    art_image.classList.toggle('overlay');
    dur();
}

function playNextSong() 
{
    x++;
    if (x>=artistName.length) 
    {
        x=0;
    }
    removeEffect();
    songs(x);

    ad.addEventListener('loadedmetadata', function() 
    {
        effect();
        updateSongSlider();
    },{ once:true});
}

function removeEffect()
{
    ad.pause();
    ad.currentTime=0.01;
    title.classList.remove('run');
    playing.classList.remove('none');
    pause.classList.add('none');
    art_image.classList.remove('overlay');
}

var x=0;
function backward()
{
    dur();
    x-=1;
    removeEffect();
    songs(x);
    if(x<=0)
    {
        x=artistName.length;
    }
}

function forward()
{
    dur();
    x+=1;
    removeEffect();
    songs(x);
    if(x>=artistName.length-1)
    {
        x=-1;
    }
}

function songs(x)
{
    art_name.innerHTML=artistName[x];
    title.innerHTML=artistTitle[x];
    art_image.src=`img${x}.jpeg`
    ad.src=`song${x}.mp3`
}

songs(0);

const lines=document.querySelector('.linechild');
const progress=document.querySelector('.line');
const srt=document.querySelector('#start');
const end=document.querySelector('#end');

function dur()
{ 
    var dura=ad.duration;
    var sec=Math.floor(dura%60);
    var min=Math.floor(dura/60);
    if(sec<10)
    {
        sec=`0${sec}`;
    }
    end.innerHTML=`${min}:${sec}`;
}

function prog()
{
    var curTime=ad.currentTime;
    var curmin=Math.floor(curTime/60);
    var cursec=Math.floor(curTime%60);
    if(cursec<10)
    {
        cursec=`0${cursec}`;
    }
    srt.innerHTML=`${curmin}:${cursec}`;
    updateSongSlider();
}

function line()
{
    var widthbar=(ad.currentTime/ad.duration)*100;
    lines.style.width=`${widthbar}%`;
}

function togglePlayPause() 
{
    if(ad.paused) 
    {
        ad.play();
        playing.classList.add('none'); 
        pause.classList.remove('none');
    } 
    else 
    {
        ad.pause();
        pause.classList.add('none');
        playing.classList.remove('none');
    }
}

function setVolume(volume) {
    ad.volume = volume;
}

function volumeUp() 
{
    if (ad.volume<1) 
    {
        ad.volume+=0.1;
        updateVolumeSlider();
    }
}

function seekForward() 
{
    ad.currentTime+=10;
    updateSongSlider();
}

function seekBackward() 
{
    ad.currentTime-=10;
    updateSongSlider();
}

function volumeDown()
{
    if(ad.volume>0) 
    {
        ad.volume-=0.1;
        updateVolumeSlider();
    }
}

function updateVolumeSlider() 
{
    volumeSlider.value=ad.volume;
}

function setSongPosition(position) 
{
    const newPosition=(position/100)*ad.duration;
    ad.currentTime=newPosition;
    updateSongSlider();
}

function updateSongSlider() 
{
    const currentPosition=ad.currentTime;
    const totalDuration=ad.duration;
    if(!isNaN(totalDuration)) 
    {
        const newPosition=(currentPosition/totalDuration)*100;
        songSlider.value=newPosition;
    }
}
ad.addEventListener('ended',playNextSong);

for(let i = 0; i < 90; i++){
  
    const left = (i * 2) + 1;
    const anim = Math.floor(Math.random() * 75 + 400);
    const height = Math.floor(Math.random() * 25 + 3);
    console.log(height);
    
    document.querySelector('#bars').innerHTML += `<div class="bar" style="left:${left}px;animation-duration:${anim}ms;height:${height}px"></div>`;//`<div class="bar" style="left:${left}px">Hello</div>`;
  }