<?php

namespace App\Http\Controllers;

use App\GroupRole;
use App\Http\Requests\StoreGroupRequest;
use App\Models\Group;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $groups = Group::withCount('users')
            ->latest()
            ->get();

        return Inertia::render('groups/index', compact('groups'));
    }

    public function create(): Response
    {
        return Inertia::render('groups/create');
    }

    public function show(Group $group): Response
    {
        return Inertia::render('groups/show', compact('group'));
    }

    public function edit(Group $group): Response
    {
        return Inertia::render('groups/edit', compact('group'));
    }

    public function store(StoreGroupRequest $request): RedirectResponse
    {
        $user = $request->user();

        $group = Group::create([
            'name' => $request->validated('name'),
        ]);

        $group->users()->attach($user, ['role' => GroupRole::OWNER]);

        return redirect()->route('groups.show', $group);
    }
}
