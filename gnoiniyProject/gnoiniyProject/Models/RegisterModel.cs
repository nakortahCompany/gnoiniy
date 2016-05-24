using System;
using System.ComponentModel.DataAnnotations;

namespace gnoiniyProject.Models
{
    public class RegisterModel
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string NickName { get; set; }
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Required]
        [Compare("Password", ErrorMessage = "Passwords does not match.")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }

    }
}