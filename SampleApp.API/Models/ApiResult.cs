namespace SampleApp.API.Models;

public class ApiResult<T>
    where T : class
{
    public int PageSize { get; set; }
    public int PageNumber { get; set; }
    public required List<T> Data { get; set; }
}
