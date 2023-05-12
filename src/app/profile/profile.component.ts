import { Profile } from './../models/profile';
import { user } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface jobTitle {
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  [key: string]: any;
  skills: { SkillName: string; yearsOfExperience: number }[] = [];

  profileData: Profile = {
    name: '',
    number: '',
    city: '',
    country: '',
    address: '',
    birthdate: '',
    title: '',
    jobTitles: [],
    industry: '',
    minSalary: {
      value: 0,
      currency: '',
    },
    yearsOfExperience: 0,
    skills: this.skills,
    currentCareerlevel: '',
    jopType: '',
    currentEducationalLevel: '',
    fieldOfStudy: '',
    University: '',
    GraduationYear: '',
    Grade: '',
    languages: [],
    email: '',
    image: '',
  };

  showPassword: boolean = false;
  showPassword2: boolean = false;
  password: string | undefined;
  confirmpassword: string | undefined;
  message: string | undefined;
  isequal: boolean = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  image: string = '';
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  JobTitles: any[] = [];
  selectedCareerLevel: string | undefined;
  careerLevels = [
    'Student',
    'Entry Level',
    'Experienced',
    'Manager',
    'Senior Management',
  ];
  selectedJobType: string | undefined;
  jobTypeOptions = [
    'Full Time',
    'Part Time',
    'Freelance',
    'internship',
    'Remotely',
    'Volunteering',
  ];
  selectedEducationalLevel: string | undefined;
  educationalLevels = [
    'Bachelors Degree',
    'Master Degree',
    'Doctorate Degree',
    'High school',
    'Vocational',
    'Diploma',
  ];
  constructor(private user: UserService, private http: HttpClient) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  birthdateFormControl = new FormControl();
  nameFormControl = new FormControl('', [Validators.required]);
  numberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})'
    ),
  ]);
  cityFormControl = new FormControl('', [Validators.required]);
  countryFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
    ),
  ]);
  confirmpasswordFormControl = new FormControl('', [Validators.required]);
  fieldOfStudyFormControl = new FormControl('', [Validators.required]);
  industryFormControl = new FormControl('', [Validators.required]);
  GraduationYearFormControl = new FormControl('', [Validators.required]);
  universityFormControl = new FormControl('', [Validators.required]);
  gradeFormControl = new FormControl('', [Validators.required]);
  titleFormControl = new FormControl('', [Validators.required]);
  titlesFormControl = new FormControl('', [Validators.required]);
  yearsOfExperienceFormControl = new FormControl('', [Validators.required]);
  jopTypeFormControl = new FormControl('', [Validators.required]);
  languagesFormControl = new FormControl(null, Validators.required);
  minSalaryFormControl = new FormControl('', [Validators.required]);
  currencyFormControl = new FormControl('', [Validators.required]);
  skillNameFormControl = new FormControl('', [Validators.required]);
  yearsOfExperienceSkillFormControl = new FormControl('', [
    Validators.required,
  ]);

  languages = require('ts-extended-language-list');
  langs = this.languages.ExtendedLanguageList.getData('en');

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  public togglePasswordVisibility2(): void {
    this.showPassword2 = !this.showPassword2;
  }
  public validation(): void {
    if (
      this.passwordFormControl.value != this.confirmpasswordFormControl.value
    ) {
      this.isequal === !this.isequal;
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.JobTitles.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: jobTitle): void {
    const index = this.JobTitles.indexOf(fruit);

    if (index >= 0) {
      this.JobTitles.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.user.getUserInfo().subscribe((res) => {
      console.log(res);
      this.profileData = res;
      console.log(this.profileData);
      this.setValue('emailFormControl', this.profileData.email);
      this.setValue('nameFormControl', this.profileData.name);
      this.setValue('numberFormControl', this.profileData.number);
      this.setValue('cityFormControl', this.profileData.city);
      this.setValue('countryFormControl', this.profileData.country);
      this.setValue('addressFormControl', this.profileData.address);

      const birthdate = new Date(this.profileData.birthdate);
      this.setValue('birthdateFormControl', birthdate);

      this.setValue('titleFormControl', this.profileData.title);
      this.setValue('jopTypeFormControl', this.profileData.jopType);
      // this.setValue('currentEducationalLevelFormControl', this.profileData.currentEducationalLevel);
      this.setValue('fieldOfStudyFormControl', this.profileData.fieldOfStudy);
      this.setValue('universityFormControl', this.profileData.University);
      this.setValue(
        'GraduationYearFormControl',
        this.profileData.GraduationYear
      );
      this.setValue('gradeFormControl', this.profileData.Grade);
      this.setValue('industryFormControl', this.profileData.industry);
      this.setValue(
        'yearsOfExperienceFormControl',
        this.profileData.yearsOfExperience
      );
      this.setValue(
        'currentCareerlevelFormControl',
        this.profileData.currentCareerlevel
      );
      this.setValue('languagesFormControl', this.profileData.languages);
      this.setValue('titlesFormControl', this.profileData.jobTitles);
      this.setValue('minSalaryFormControl', this.profileData.minSalary.value);
      this.setValue('currencyFormControl', this.profileData.minSalary.currency);
      this.selectedCareerLevel = this.profileData.currentCareerlevel;
      this.selectedJobType = this.profileData.jopType;
      this.selectedEducationalLevel = this.profileData.currentEducationalLevel;
      this.skills = this.profileData.skills;
      for (let i = 0; i < this.profileData.jobTitles.length; i++) {
        this.JobTitles.push({ name: this.profileData.jobTitles[i] });
      }
      console.log(this.JobTitles[0].name);

      this.image = this.profileData.image;
    });
  }
  addSkill() {
    if (
      this.skillNameFormControl.valid &&
      this.yearsOfExperienceSkillFormControl.valid
    ) {
      const newSkill = {
        SkillName: this.skillNameFormControl.value!,
        yearsOfExperience: +this.yearsOfExperienceSkillFormControl.value!,
      };
      this.skills.push(newSkill);
      this.skillNameFormControl.reset();
      this.yearsOfExperienceSkillFormControl.reset();
    }
  }

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
  }

  setValue(controlName: string, value: any) {
    const control = this[controlName];
    if (control) {
      control.setValue(value);
    }
  }
  saveProfileData() {
    let data = {
      email: this.emailFormControl.value,
      name: this.nameFormControl.value,
      number: this.numberFormControl.value,
      city: this.cityFormControl.value,
      country: this.countryFormControl.value,
      address: this.addressFormControl.value,
      birthdate: this.birthdateFormControl.value,
      title: this.titleFormControl.value,
      jopType: this.selectedJobType,
      fieldOfStudy: this.fieldOfStudyFormControl.value,
      University: this.universityFormControl.value,
      GraduationYear: this.GraduationYearFormControl.value,
      Grade: this.gradeFormControl.value,
      industry: this.industryFormControl.value,
      yearsOfExperience: this.yearsOfExperienceFormControl.value,
      currentCareerlevel: this.selectedCareerLevel,
      languages: this.languagesFormControl.value,
      jobTitles: this.JobTitles,
      minSalary: {
        value: this.minSalaryFormControl.value,
        currency: this.currencyFormControl.value,
      },
      currentEducationalLevel: this.selectedEducationalLevel,
      skills: this.skills,
      image: this.image,
    };

    console.log(data.name);

    this.user.updateProfile(data);
  }
}
