import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Output() avatarSelected = new EventEmitter<string>();
  @Input() currentAvatar: string = 'av-1.png';

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  ngOnInit() {
    console.log(this.currentAvatar);

    this.avatars.forEach( avatar => {
      avatar.selected = (avatar.img == this.currentAvatar)? true : false;
    })
  }

  selectAvatar( avatar ) {

    this.avatars.forEach( avatar => avatar.selected = false);

    avatar.selected = true;

    this.avatarSelected.emit( avatar.img );
}

}
