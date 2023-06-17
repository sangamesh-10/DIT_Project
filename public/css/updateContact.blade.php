<form action="{{ route('updateContact') }}" method="POST">
    @csrf
    @method('PUT')

    <label for="mobile">New Mobile Number:</label>
    <input type="text" name="mobile" id="mobile">

    <button type="submit">Update Mobile Number</button>
</form>
@if (session('success'))
    <div class="alert alert-success">
        {{ session('success') }}
    </div>
@endif
