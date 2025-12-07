using FluentValidation;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;

namespace SampleApp.API.Validations;

public class UserValidator : AbstractValidator<LoginDto>
{
    public UserValidator()
    {
        RuleFor(u => u.Login)
            .NotEmpty()
            .WithMessage("Login обязательно")
            .Length(2, 50)
            .WithMessage("Login должен быть от 2 до 50 символов")
            .Must(StartsWithCapitalLetter)
            .WithMessage("Login должен начинаться с заглавной буквы");
    }

    private bool StartsWithCapitalLetter(string login)
    {
        if (string.IsNullOrEmpty(login))
            return false;
        return char.IsUpper(login[0]);
    }
}
