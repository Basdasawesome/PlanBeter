<?php

namespace App\Http\Controllers;

use App\GroupRole;
use App\Http\Requests\AttachMembersGroupRequest;
use App\Http\Requests\ChangeRoleRequest;
use App\Http\Requests\DetachMembersGroupRequest;
use App\Http\Requests\EditGroupRequest;
use App\Http\Requests\StoregroupRequest;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GroupController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $groups = $user->groups()
            ->latest()
            ->get()
            ->load('users');

        return Inertia::render('groups/index', compact('groups'));
    }

    public function create(): Response
    {
        return Inertia::render('groups/create');
    }

    public function show(Group $group): Response
    {
        $group = $group->load('users');

        return Inertia::render('groups/show', compact('group'));
    }

    public function edit(Group $group): Response
    {
        $roles = GroupRole::cases();
        $group->load('users:id,name,email');
        return Inertia::render('groups/edit', compact('group', 'roles'));
    }

    public function store(StoregroupRequest $request): RedirectResponse
    {
        $user = $request->user();

        $group = Group::create([
            'name' => $request->validated('name'),
        ]);

        $group->users()->attach($user, ['role' => GroupRole::OWNER]);

        return redirect()->route('groups.show', $group);
    }

    public function update(EditGroupRequest $request, Group $group): RedirectResponse
    {
        $group->name =  $request->validated('name');

        $group->save();

        return redirect()->back()->with('succes', 'aanpassingen opgeslagen');
    }

    public function attachUser(AttachMembersGroupRequest $request, Group $group): RedirectResponse
    {
        $inputEmail = $request->validated('email');

        $user = User::where('email', $inputEmail)
            ->first();

        if ($user) {
            if ($inputEmail != null) {
                $id = $user->id;

                if ($group->users()->where('user_id', $id)->exists()) {
                    return redirect()->back()->with('error', 'This user is already a member');
                }

                $group->users()->attach($user);
            } else {
                return redirect()->back();
            }
        }
        return redirect()->back()->with('succes', 'user added to group members');
    }

    public function detachUser(Group $group, User $user): RedirectResponse
    {
        $group->users()->detach($user);
        
        return redirect()->back()->with('succes', 'user removed from group members');
    }

    public function changeRole(ChangeRoleRequest $request, Group $group): RedirectResponse
    {
        $ownerCount = $group->users()->where('role', 'owner')->count();
        $user = $group->users()->where('user_id', $request->validated('user'))->first();

        if ($ownerCount === 1 && $user->pivot->role === 'owner') {
            return redirect()->back()->with('error', 'Er moet altijd 1 owner in de groep zitten');
        }

        $group->users()->updateExistingPivot($request->validated('user'), ['role' => $request->validated('role')]);

        return redirect()->back();
    }
}